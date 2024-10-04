import UserModel from '../../models/userModel.ts';
import jwt from 'jsonwebtoken';
import PasswordService from '../../services/password.service.ts';
import 'dotenv/config';
import crypto from 'crypto';
import MailService from '../../services/mail.service.ts';
import { User } from '../../types'

const SECRET_KEY = process.env.SECRET_KEY as string;


class AuthService {
    async register(user: User): Promise<string> {
        const existingUser = await UserModel.getUserByUserName(user.username);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const salt = PasswordService.generateSalt();
        const hashedPassword = PasswordService.hashPassword(user.password, salt);
        user.password = hashedPassword;
        user.salt = salt;

        const userId = await UserModel.createUser(user);
        return this.generateToken({ id: userId });
    }

    async login(username: string, password: string): Promise<string> {
        const user = await UserModel.getUserByUserName(username);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = PasswordService.verifyPassword(password, user.salt!, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return this.generateToken({ id: user.id });
    }

    async forgotPassword(email: string): Promise<void> {
        const user = await UserModel.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const token = crypto.randomBytes(32).toString('hex');
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour
        await UserModel.updateResetToken(user.id, token, resetTokenExpiration);
        await MailService.sendResetEmail(email, resetLink);
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        const user = await UserModel.getUserByResetToken(token);
        if (!user || new Date(user.resetTokenExpiration) < new Date()) {
            throw new Error('Invalid or expired token');
        }
        const salt = PasswordService.generateSalt();
        const hashedPassword = PasswordService.hashPassword(newPassword, salt);
        await UserModel.updatePassword(user.id, hashedPassword, salt);
        await UserModel.updateResetToken(user.id, null, null); // Clear the reset token
    }

    generateToken(payload: object): string {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    }
}

export default new AuthService();
