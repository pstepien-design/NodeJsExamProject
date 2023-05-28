import multer from 'multer';
import path from 'path';
import { getUserIdFromToken } from '../authentication/authentication.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  async filename(req, file, cb) {
    const userId = await getUserIdFromToken(req.headers.authorization);
    const filenameParts = file.originalname.split('.');
    if (filenameParts.length <= 1) {
      cb(new Error('File has invalid extension ' + file.originalname));
      return;
    }

    const extension = filenameParts[filenameParts.length - 1];

    const newFileName = userId + '.' + extension;

    cb(null, newFileName);
  },
});

const imageFileFilter = (req, file, cb) => {
  // Accept only image files
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (
    file.mimetype.startsWith('image/') &&
    allowedExtensions.includes(fileExtension)
  ) {
    cb(null, true); // Accept the file
  } else {
    cb('You provided a non image filetype'); // Reject the file
  }
};

export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.write(400).json({ error: 'File size limit exceeded' });
    }
  }
  next(err);
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB limit (adjust as needed)
  },
  fileFilter: imageFileFilter,
});
