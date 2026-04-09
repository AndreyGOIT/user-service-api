import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user.repository';
import { UserRole } from '../types/user';
import { generateToken } from '../utils/jwt';


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
    },
    
  async login(data: any) {
    const user = await userRepository.findByEmail(data.email);
  
    if (!user) {
      throw new Error('Invalid credentials');
    }
  
    if (!user.isActive) {
      throw new Error('User is blocked');
    }
  
    const isMatch = await bcrypt.compare(data.password, user.password);
  
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
  
    const token = generateToken({
      userId: user.id,
      role: user.role
    });
  
    return token;
  }
};

