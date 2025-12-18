import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export function requireUser(req: Request, res: Response, next: NextFunction) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const authHeader = req.headers.authorization;
    
    const token = authHeader?.split(" ")[1];

    console.log("Token: ", token);
    const decoded = jwt.verify(token as string, JWT_SECRET) as JwtPayload;

    (req as any).userId = decoded.userId;
    (req as any).email = decoded.email;
    (req as any).role = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

// export function requireAdmin(req: Request, res: Response, next: NextFunction){
//   const token =
// }
