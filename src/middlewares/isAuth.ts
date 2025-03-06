import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

// Extend NextApiRequest to include user property
declare module 'next' {
  interface NextApiRequest {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: any;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Keep this secret in .env

// Middleware to authenticate user via JWT token
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authenticate = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the user info (userId or email) to the request object
    req.user = decoded;

    return handler(req, res); // Proceed to the actual route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token'+ error });
  }
};
