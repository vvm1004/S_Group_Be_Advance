import { Request, Response } from 'express';
import userService from './userService.ts';

class UserController {
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const user = await userService.getUserById(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = req.body;
            const userId = await userService.createUser(newUser);
            res.status(201).json({ message: 'User created successfully', id: userId });
        } catch (error) {
            if (error.message === 'Username already exists' || error.message === 'Email already exists') {
                res.status(400).json({ message: 'Username or email already exists' });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const updateUser = req.body;
            const userFound = await userService.updateUser(id, updateUser);
            if (userFound) {
                res.json({ message: 'User updated successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const userDeleted = await userService.deleteUser(id);
            if (userDeleted) {
                res.json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new UserController();
