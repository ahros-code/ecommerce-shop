import "dotenv/config"

export const DB = process.env["DB_CONNECTION_STRING"];
export const JWT_SECRET = process.env["JWT_SECRET_KEY"];
export const NODEMAILER_USER = process.env["NODEMAILER_USER"];
export const NODEMAILER_PASS = process.env["NODEMAILER_PASS"];
export const EMAIL_SENDER = process.env["MESSAGE_SENDER_EMAIL"];
export const BACKEND_URL = process.env["BACKEND_URL"]