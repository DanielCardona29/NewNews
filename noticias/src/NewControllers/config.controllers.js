import dotenv from 'dotenv';
dotenv.config();
const config = {
    serverURL: process.env.SERVER_URL,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL
}
export default config;