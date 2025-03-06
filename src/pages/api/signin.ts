import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
      
      const passwordStatus = await bcrypt.compare(password, user[0].password);
      if(passwordStatus) {
        // Generate JWT token with user's email
        const token = jwt.sign({ email: user[0].email }, JWT_SECRET, { expiresIn: '24h' });
        
        res.status(200).json({ 
          message: "Signed In Successfully !", 
          data: { 
            userEmail: user[0].email,
            token 
          } 
        });
      }else {
        res.status(401).json({ message: "Email or Password not matched !"});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error creating user" });
    }
  }
}
