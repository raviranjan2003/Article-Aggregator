import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/index";
import { articles, users } from "@/db/schema";
import axios from "axios";
import { eq, inArray } from "drizzle-orm";
import { authenticate } from "../../middlewares/isAuth";

const SERPER_API_KEY = process.env.SERPER_API_KEY;

const getArticlesByUserEmail = async (userEmail: string) => {
  // First get user's categories
  const user = await db.select().from(users).where(eq(users.email, userEmail)).limit(1);
  if (!user.length) {
    throw new Error('User not found');
  }
  
  // Then get articles matching user's categories
  return await db.select().from(articles).where(inArray(articles.category, user[0].categories));
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { category } = req.body;

    // Validate category
    if (!category) {
      return res.status(400).json({ error: "category is required" });
    }

    // Validate SERPER_API_KEY
    if (!SERPER_API_KEY) {
      return res.status(500).json({ error: "Serper API key is missing" });
    }

    try {
      const response = await axios.post(
        "https://google.serper.dev/search",
        {
          q: category + " latest news",
          gl: "us",
          hl: "en",
        },
        {
          headers: { "X-API-KEY": SERPER_API_KEY },
        }
      );
      // console.log("Response==>", response);
      // Validate response data
      if (!response.data?.organic) {
        return res.status(500).json({ error: "Invalid response from Serper API" });
      }

      // Map response data to article format
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const articleData = response.data.organic.map((item: any) => {
        return {
        title: item.title,
        url: item.link,
        snippet: item.snippet,
        category,
        }
      });

      // Insert articles into the database
      await db.insert(articles).values(articleData);
      res.status(200).json({ message: "Articles stored successfully", articleData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching articles" });
    }
  }

  // if (req.method === "GET") {
  //   const { userEmail } = req.query;

  //   // Validate userEmail
  //   if (!userEmail) {
  //     return res.status(400).json({ error: "userEmail is required" });
  //   }
  //   if (typeof userEmail !== "string") {
  //     return res.status(400).json({ error: "Invalid userEmail parameter" });
  //   }

  //   try {
  //     // Fetch user by email
  //     const user = await db.select().from(users).where(eq(users.email, userEmail)).limit(1);
  //     if (!user.length) {
  //       return res.status(404).json({ error: "User not found" });
  //     }

  //     // Fetch articles based on user categories
  //     const userCategories = user[0].categories;
  //     const userArticles = await db.select().from(articles).where(inArray(articles.category, userCategories));
  //     res.status(200).json(userArticles);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Error fetching user articles" });
  //   }
  // }
  if (req.method === 'GET') {
    try {
      const articles = await getArticlesByUserEmail(req.user.email);
      return res.status(200).json(articles);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching articles' + error });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// Export the handler wrapped with authentication middleware
export default authenticate(handler);