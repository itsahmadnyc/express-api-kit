const path = require('path');
const fs = require('fs-extra');

/**
 * Save an uploaded file
 * @param {string} folder - Folder name (e.g., 'uploads/')
 * @param {object} file - File object (from multer)
 */
const saveFile = async (folder, file) => {
  try {
    const uploadPath = path.join(__dirname, '..', 'uploads', folder);
    await fs.ensureDir(uploadPath);

    const filePath = path.join(uploadPath, file.originalname);
    await fs.writeFile(filePath, file.buffer);

    console.log(`✅ File saved at ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('❌ Error saving file:', error);
  }
};

module.exports = { saveFile };
