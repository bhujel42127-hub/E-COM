export const getUploadedFileUrl = (file: Express.Multer.File): string => {
  // multer-storage-cloudinary attaches the file URL to file.path
  return file.path;
};
