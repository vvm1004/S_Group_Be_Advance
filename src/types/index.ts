import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    gender: string;
    age: number;
    username: string;
    salt: string;
    role_id: number;
    resetToken?: string;
    resetTokenExpiration?: Date;
}

export interface Role {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}

export interface CustomeRequest extends Request {
    user?: string | JwtPayload;
}