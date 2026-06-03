import path from 'path';
import multer from 'multer';

// Storage configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadPath = path.resolve('uploads/');
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// File validation
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|mp4|mov|avi/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images and Videos only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export default upload;
