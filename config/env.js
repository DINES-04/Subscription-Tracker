import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
export const { 
    PORT, 
    NODE_ENV, 
    DB_URL,
    JWT_SECRET,
    JWT_EXPIRES_IN, 
    ARCJECT_KEY, ARCJECT_ENV,
    QSTASH_URL,QSTASH_TOKEN, SERVER_URL,
    EMAIL_PASSWORD,
} = process.env;
