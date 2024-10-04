import { Request, Response } from 'express';
import AuthService from '../auth/authService.ts';

class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const user = req.body;
            const token = await AuthService.register(user);
            res.status(201).json({ success: true, token });
        } catch (error: any) {
            if (error.message === 'User already exists') {
                res.status(409).json({ success: false, message: 'Username or email already exists' });
            } else {
                res.status(500).json({ success: false, message: 'Internal Service Error' });
            }
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const token = await AuthService.login(username, password);
            res.status(200).json({ success: true, token });
        } catch (error: any) {
            if (error.message === 'User not found' || error.message === 'Invalid password') {
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            } else {
                res.status(500).json({ success: false, message: 'Internal Service Error' });
            }
        }
    }

    async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            await AuthService.forgotPassword(email);
            res.status(200).json({ success: true, message: 'Password reset link sent' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { token } = req.params;
            const { newPassword } = req.body;
            await AuthService.resetPassword(token, newPassword);
            res.status(200).json({ success: true, message: 'Password reset successful' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new AuthController();
