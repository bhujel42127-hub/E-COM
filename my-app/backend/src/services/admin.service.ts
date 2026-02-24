import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

class AdminService {
  async getAdmins(limit?: number, skip?: number) {
    const [admins, total] = await Promise.all([
      User.find({ role: "ADMIN" }).skip(skip || 0).limit(limit || 10),
      User.countDocuments({ role: "ADMIN" }),
    ]);
    return { admins, total };
  }
  async updateAdmin(id: string, data: any) {
    // console.log("Update Admin service reached");
    return await User.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
  }
  async createAdmin(name: string, email: string, password: string) {
    const exists = await User.findOne({ email });
    if (exists) throw new Error("Email already in use!");

    const hashed = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashed,
      role: "ADMIN",
    });

    return {
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    };
  }
  async deleteAdmin(id: string) {
    return await User.findOneAndDelete({ _id: id });
  }
}

export const adminService = new AdminService();
