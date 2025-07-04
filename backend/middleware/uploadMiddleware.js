import multer from 'multer';

const storage = multer.memoryStorage(); // store in memory only

const upload = multer({ storage });

export default upload;
