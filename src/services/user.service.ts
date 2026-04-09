import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user.repository';
import { UserRole } from '../types/user';

export const userService = {
  async register(data: any) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userRepository.create({
      fullName: data.fullName,
      birthDate: new Date(data.birthDate),
      email: data.email,
      password: hashedPassword,
      role: UserRole.USER,
      isActive: true
    });

    return user;
  }
};