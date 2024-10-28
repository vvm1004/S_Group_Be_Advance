import UserModel from '../../models/userModel.ts';
import PasswordService from '../../services/password.service.ts';

class UserService {
    async getAllUsers() {
        try {
            return await UserModel.getAllUsers();
        } catch (error) {
            throw new Error('Error in UserService.getAllUsers: ' + error.message);
        }
    }

    async getUserById(id: number) {
        try {
            return await UserModel.getUserById(id);
        } catch (error) {
            throw new Error('Error in UserService.getUserById: ' + error.message);
        }
    }

    // async createUser(newUser: any) {
    //     try {
    //         const userByUsername = await UserModel.getUserByUserName(newUser.username);
    //         if (userByUsername) {
    //             throw new Error('Username already exists');
    //         }

    //         const userByEmail = await UserModel.getUserByEmail(newUser.email);
    //         if (userByEmail) {
    //             throw new Error('Email already exists');
    //         }

    //         const salt = PasswordService.generateSalt();
    //         const hashedPassword = PasswordService.hashPassword(newUser.password, salt);

    //         const createdUser = {
    //             ...newUser,
    //             password: hashedPassword,
    //             salt: salt
    //         };

    //         return await UserModel.createUser(createdUser);
    //     } catch (error) {
    //         throw new Error('Error in UserService.createUser: ' + error.message);
    //     }
    // }

    async updateUser(id: number, updateUser: Partial<any>) {
        try {
            return await UserModel.updateUser(id, updateUser);
        } catch (error) {
            throw new Error('Error in UserService.updateUser: ' + error.message);
        }
    }

    async deleteUser(id: number) {
        try {
            return await UserModel.deleteUser(id);
        } catch (error) {
            throw new Error('Error in UserService.deleteUser: ' + error.message);
        }
    }
}

export default new UserService();
