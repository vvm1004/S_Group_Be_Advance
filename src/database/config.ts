import mysql, { Pool } from 'mysql2/promise';
import 'dotenv/config';

interface DBConfig {
	host: string;
	user: string;
	password: string;
	database: string;
}

const dbConfig: DBConfig = {
	host: process.env.DB_HOST as string,
	user: process.env.DB_USER as string,
	password: process.env.DB_PASSWORD as string,
	database: process.env.DB_NAME as string,
};

export const connection: Pool = mysql.createPool(dbConfig);
