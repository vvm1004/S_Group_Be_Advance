import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../database/typeorm.config.ts';
import { User } from '../models/entities/User.ts';
import { CustomeRequest } from '../types';

export const checkPermission = (permissionName: string) => {
  return async (req: CustomeRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = typeof req.user === 'object' && 'id' in req.user ? Number(req.user.id) : null;

      if (!userId) {
        res.status(401).json({ message: 'Invalid user ID' });
        return;
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: userId },
        relations: ['roles', 'roles.permissions'],
      });

      if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      const hasPermission = user.roles.some(role =>
        role.permissions.some(permission => permission.name === permissionName)
      );

      if (!hasPermission) {
        res.status(403).json({ message: 'Forbidden: You do not have the required permission' });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
      return;
    }
  };
};
