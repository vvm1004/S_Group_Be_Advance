import { DataSource } from "typeorm";
import { User } from "../models/entities/User.ts";
import { Role } from "../models/entities/Role.ts";
import 'dotenv/config';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Permission } from '../models/entities/Permission.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, // chỉ dùng cho development
    logging: false,
    entities: [User, Role, Permission],
    migrationsTableName: 'migrations',
    migrations: [join(__dirname, '../../src/migrations/**/*.ts')],
    subscribers: [],
});
