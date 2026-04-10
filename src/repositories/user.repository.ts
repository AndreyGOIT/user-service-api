import { prisma } from '../config/prisma';

export const userRepository = {
  findByEmail: (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },

  create: (data: any) => {
    return prisma.user.create({ data });
    },
  
  findById: (id: string) => {
  return prisma.user.findUnique({ where: { id } });
},

findAll: () => {
  return prisma.user.findMany();
},

update: (id: string, data: any) => {
  return prisma.user.update({
    where: { id },
    data
  });
}
};