import type { Request, Response } from "express";
import { getUploadedFileUrl } from "../services/upload.service";
import { uploadToCloudinary } from "../config/cloud";

export const uploadSingleImage = async(req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = getUploadedFileUrl(req.file as Express.Multer.File);
    console.log("after fileUrl uploadToCloudinary ")     
    const result = await uploadToCloudinary(req.file);
    res.json({ 
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      fileUrl 
    });
  } catch (err: any) {
    console.log("Upload error: ", err)
    res.status(500).json({ error: 'Upload failed' });
  }
};
