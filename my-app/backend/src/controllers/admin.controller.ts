import type { Request, Response } from "express";
import { adminService } from "../services/admin.service";
import { User } from "../models/user.model";

export async function getAdmins(req: Request, res: Response) {
  console.log("in get admin controller");
  try {
    const admins = await adminService.getAdmins();
    res.json({ message: "Admins fetched", admins });
  } catch (error) {
    console.log("Error while getting admins:", error);
  }
}
export async function updateAdmin(req: Request, res: Response) {
  console.log("in get update admin controller");
  console.log("Req params: ", req.params);

  const { id } = req.params;

  try {
    await adminService.updateAdmin(id as string, req.body);
    res.json({ message: "Admin updated" });

    // console.log("After Admin edit service  reached");
  } catch (error) {
    console.log("Error while getting admins:", error);
  }
}
export async function deleteAdmin(req: Request, res: Response) {
  console.log("in get delete admin controller");
  const { id } = req.params;
  //   console.log("id", id);
  try {
    await adminService.deleteAdmin(id as string);
    res.json({ message: "Admin deleted" });
  } catch (error) {
    console.log("Error while deleting admin:", error);
  }
}
export async function createAdmin(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const { admin } = await adminService.createAdmin(name, email, password);
    res.json({ message: "Admin created", admin });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
