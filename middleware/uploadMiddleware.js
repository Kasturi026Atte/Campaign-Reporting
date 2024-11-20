import multer from 'multer';

// Set storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
  }
});

// Filter to allow only CSV files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only CSV files are allowed'), false);
  }
};

// Multer middleware setup
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
