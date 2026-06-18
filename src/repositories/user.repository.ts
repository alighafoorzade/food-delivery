import prisma from "../config/prisma";

export class UserRepository {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async create(data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        return prisma.user.create({
            data
        })
    }
}