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
    },
  
  async getById(requester: any, userId: string) {
  if (requester.role !== 'ADMIN' && requester.userId !== userId) {
    throw new Error('Forbidden');
  }

  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
},

async getAll(requester: any) {
  if (requester.role !== 'ADMIN') {
    throw new Error('Forbidden');
  }

  return userRepository.findAll();
},

async blockUser(requester: any, userId: string) {
  if (requester.role !== 'ADMIN' && requester.userId !== userId) {
    throw new Error('Forbidden');
  }

  return userRepository.update(userId, {
    isActive: false
  });
}
};

