const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createUploadHandler = (options = {}) => {
  const {
    folderName = 'uploads',
    fieldName = 'file',
    maxFiles = 1,
    maxSize = 20 * 1024 * 1024, 
    fileFilter = null,
    fileNamePrefix = 'file'
  } = options;

  
  const uploadDir = path.join(__dirname, `../uploads/${folderName}`);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

 
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const userId = req.user?.id || fileNamePrefix;
      const timestamp = Date.now();
      const extension = path.extname(file.originalname);
      const filename = `${userId}_${timestamp}${extension}`;
      cb(null, filename);
    }
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: maxSize,
      files: maxFiles
    },
   
  });


  return (req, res, next) => {
    const uploadFunction = maxFiles === 1 ? upload.single(fieldName) : upload.array(fieldName, maxFiles);
    
    uploadFunction(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: `File size too large. Maximum size is ${maxSize / (1024 * 1024)}MB`
          });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({
            success: false,
            message: `Too many files. Maximum ${maxFiles} files allowed`
          });
        }
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({
            success: false,
            message: `Unexpected field name. Please use "${fieldName}" as the field name`
          });
        }
        return res.status(400).json({
          success: false,
          message: 'File upload error: ' + error.message
        });
      } else if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      
      const APP_URL = process.env.APP_URL || 'http://localhost:3000';
      
      if (maxFiles === 1) {
     
        if (req.file) {
          req.uploadedFileUrl = `${APP_URL}/uploads/${folderName}/${req.file.filename}`;
         
          if (folderName === 'profiles') req.profilePicUrl = req.uploadedFileUrl;
          if (folderName === 'business-logos') req.businessLogoUrl = req.uploadedFileUrl;
        }
      } else {
       
        if (req.files && req.files.length > 0) {
          req.uploadedImages = req.files.map(file => 
            `${APP_URL}/uploads/${folderName}/${file.filename}`
          );
        } else {
          req.uploadedImages = [];
        }
      }
      
      next();
    });
  };
};


const deleteUploadedFiles = (fileUrls, folderName = null) => {
  if (!fileUrls) return;
  
  
  const urls = Array.isArray(fileUrls) ? fileUrls : [fileUrls];
  
  urls.forEach(fileUrl => {
    if (!fileUrl) return;
    
    try {
      const filename = path.basename(fileUrl);
      
     
      let targetFolder = folderName;
      if (!targetFolder) {
        const urlParts = fileUrl.split('/uploads/');
        if (urlParts.length > 1) {
          const pathPart = urlParts[1];
          targetFolder = pathPart.substring(0, pathPart.lastIndexOf('/'));
        }
      }
      
      if (!targetFolder) {
        console.error('Could not determine folder for file deletion:', fileUrl);
        return;
      }
      
      const filePath = path.join(__dirname, `../uploads/${targetFolder}`, filename);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filename} from ${targetFolder}`);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  });
};

module.exports = {
  createUploadHandler,
  deleteUploadedFiles
};