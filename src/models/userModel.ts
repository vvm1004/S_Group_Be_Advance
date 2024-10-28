import { AppDataSource } from "../database/typeorm.config.ts";
import { User } from "./entities/User.ts";
import { Role } from "./entities/Role.ts";

class UserModel {
    async getAllUsers(): Promise<User[]> {
        try {
            const userRepository = AppDataSource.getRepository(User);
            return await userRepository.find({ relations: ["role"] });
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }

    async getAllRoles(): Promise<Role[]> {
        try {
            const roleRepository = AppDataSource.getRepository(Role);
            return await roleRepository.find();
        } catch (error) {
            throw new Error('Error fetching roles: ' + error.message);
        }
    }

    async getUserById(id: number): Promise<User | undefined> {
        try {
            const userRepository = AppDataSource.getRepository(User);
            return await userRepository.findOne({ where: { id }, relations: ["role"] });
        } catch (error) {
            throw new Error('Error fetching user by ID: ' + error.message);
        }
    }

    // async createUser(user: Partial<User>): Promise<User> {
    //     try {
    //         const userRepository = AppDataSource.getRepository(User);
    //         const newUser = userRepository.create(user);
    //         return await userRepository.save(newUser);
    //     } catch (error) {
    //         throw new Error('Error creating user: ' + error.message);
    //     }
    // }

    async updateUser(id: number, user: Partial<User>): Promise<boolean> {
        try {
            const userRepository = AppDataSource.getRepository(User);
            await userRepository.update(id, user);
            return true;
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            const userRepository = AppDataSource.getRepository(User);
            await userRepository.delete(id);
            return true;
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }

    async getUserByUserName(username: string): Promise<User | undefined> {
        try {
            const userRepository = AppDataSource.getRepository(User);
            return await userRepository.findOne({ where: { username } });
        } catch (error) {
            throw new Error('Error fetching user by username: ' + error.message);
        }
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        try {
            const userRepository = AppDataSource.getRepository(User);
            return await userRepository.findOne({ where: { email }, relations: ["role"] });
        } catch (error) {
            throw new Error('Error fetching user by email: ' + error.message);
        }
    }

    async updateResetToken(id: number, resetToken: string, resetTokenExpiration: Date): Promise<boolean> {
        try {
            const userRepository = AppDataSource.getRepository(User);
            await userRepository.update(id, { resetToken, resetTokenExpiration });
            return true;
        } catch (error) {
            throw new Error('Error updating reset token: ' + error.message);
        }
    }

    async updatePassword(id: number, password: string, salt: string): Promise<boolean> {
        try {
            const userRepository = AppDataSource.getRepository(User);
            await userRepository.update(id, { password, salt });
            return true;
        } catch (error) {
            throw new Error('Error updating password: ' + error.message);
        }
    }

    async getUserByResetToken(resetToken: string): Promise<User | undefined> {
        try {
            const userRepository = AppDataSource.getRepository(User);
            return await userRepository.findOne({ where: { resetToken } });
        } catch (error) {
            throw new Error('Error fetching user by reset token: ' + error.message);
        }
    }
}

export default new UserModel();
