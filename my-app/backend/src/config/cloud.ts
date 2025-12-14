// import { v2 as cloudinary } from 'cloudinary';
// import multer from 'multer';
// import dotenv from "dotenv";

// dotenv.config();

// const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
// const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
// const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
//   throw new Error('Missing Cloudinary configuration. Check your .env file.');
// }

// cloudinary.config({
//   cloud_name: CLOUDINARY_CLOUD_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_API_SECRET
// });

// const storage = multer.memoryStorage();

// // Multer upload middleware
// export const upload = multer({ 
//   storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024 
//   },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type'));
//     }
//   }
// });

// // Upload to Cloudinary helper
// export const uploadToCloudinary = (file: Express.Multer.File): Promise<any> => {
//     console.log("in uploadToCloudinary ")     

//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder: 'products',
//         resource_type: 'auto'
//       },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       }
//     );
//     uploadStream.end(file.buffer);
//   });
// };

// export { cloudinary };