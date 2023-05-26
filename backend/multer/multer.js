import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const filenameParts = file.originalname.split('.');
    if (filenameParts.length <= 1) {
      cb(new Error('File has invalid extension ' + file.originalname));
      return;
    }

    const extension = filenameParts[filenameParts.length - 1];
    const originalFileName = filenameParts.join('.');
    const uniqueSuffix = Date.now();

    const newFileName =
      uniqueSuffix + '___' + originalFileName + '.' + extension;

    cb(null, newFileName);
  },
});

const imageFileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb('You provided a non image filetype'); // Reject the file
  }
};

export const upload = multer({ storage, fileFilter: imageFileFilter });
