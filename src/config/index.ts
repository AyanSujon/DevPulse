import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env'),

});

const config = {
    connectionString: process.env.NEONDB_CONNECTION_STRING as string,
    port: parseInt(process.env.PORT as string),
    jwtSecret: process.env.JWT_SECRET as string,
    corsOrigin: process.env.CORS_ORIGIN as string,
}

export default config;

