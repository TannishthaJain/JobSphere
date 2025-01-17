import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the upload folder based on the field name
    let uploadFolder = '';

    // Check the field name in the request body (e.g., 'file' for profile picture)
    if (file.fieldname === 'profilePic') {
      uploadFolder = 'profile_pics'; // Store profile pics in profile_pics folder
    } else if (file.fieldname === 'resume') {
      uploadFolder = 'resumes'; // Store resumes in resumes folder
    } else if (file.fieldname === 'companyLogo') {
      uploadFolder = 'company_logos'; // Store company logos in company_logos folder
    }

    // Set the destination to the appropriate folder under 'uploads'
    cb(null, path.join(__dirname, '../uploads', uploadFolder));
  },
  filename: (req, file, cb) => {
    // Set file name to include current timestamp to avoid name collisions
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer configuration for file upload
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    // Only allow certain file types (images for profile pictures)
    const fileTypes = /jpeg|jpg|png|pdf/; // Allow image and PDF files
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true); // Accept the file
    } else {
      cb('Error: Only images (jpg, jpeg, png) and PDFs are allowed'); // Reject the file
    }
  },
});

// Export single upload middleware for profile picture
export const profilePicUpload = upload.single('profilePic'); // Profile picture upload
export const resumeUpload = upload.single('resume'); // Resume upload
export const companyLogoUpload = upload.single('companyLogo'); // Company logo upload
