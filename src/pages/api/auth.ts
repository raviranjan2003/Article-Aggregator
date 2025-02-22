import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";

const saltRounds = 10;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, categories } = req.body;
      let password = req.body.password;

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      password = hashedPassword;

      const user = await db.insert(users).values({ email, password, categories });
      res.status(200).json({ message: "User created" });
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  }
}
