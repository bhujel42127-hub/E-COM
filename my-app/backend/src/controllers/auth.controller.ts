import type { Request, Response } from "express";
import { authService } from "../services/auth.service.ts";

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password} = req.body;
    const { user } = await authService.signup(name, email, password);

    res.json({ message: "Signup success", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  console.log("Reached Login controller");
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(
      email,
      password
    );

    res.json({ message: "Login ok", user, accessToken, refreshToken });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function refresh(req: Request, res: Response) {
  console.log("In refresh: ", req);
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const { accessToken } = await authService.refresh(token);

    localStorage.setItem("accessToken", accessToken);

    res.json({ message: "Token refreshed" });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}

export async function verifyEmail(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const resetToken = await authService.verifyEmail(email);
    console.log(`http://localhost:5173/reset-password?token=${resetToken}`);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
export async function resetPassword(req: Request, res: Response) {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    res.json({ message: "Password reset successful" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
export async function getUser(req: Request, res: Response) {
  console.log("controller get user");

  try {
    console.log("inside controller  get user try catch ");

    console.log("controller get user req:", req.body);
    const { token } = req.body;
    console.log("Access token: ", token);
    const user = await authService.getUser(token);
    return { user };
  } catch (err: any) {}
}

export async function logout(req: Request, res: Response) {
  console.log("Logout controller");
  try {
    const { token } = req.body;
    console.log("Refresh token: ", token);
    if (token) {
      await authService.logout(token);
    }
    res.json({ message: "Logged out successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

