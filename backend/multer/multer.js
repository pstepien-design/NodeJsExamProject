import multer from "multer";
import { getUserIdFromToken } from "../authentication/authentication.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  async filename(req, file, cb) {
    const userId = await getUserIdFromToken(req.headers.authorization);
    const filenameParts = file.originalname.split(".");
    if (filenameParts.length <= 1) {
      cb(new Error("File has invalid extension " + file.originalname));
      return;
    }

    const extension = filenameParts[filenameParts.length - 1];

    const newFileName = userId + "." + extension;

    cb(null, newFileName);
  },
});

const imageFileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept the file
  } else {
    cb("You provided a non image filetype"); // Reject the file
  }
};

export const upload = multer({ storage, fileFilter: imageFileFilter });
