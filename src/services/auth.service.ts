import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';

export class AuthService {

    private repository = new UserRepository();

    async register(data: any) {
        const existing = await this.repository.findByEmail(data.email)

        if(existing) {
            throw new Error('Email already exists')
        }

        const hashedPassword = await bcrypt.hash(
            data.password,
            12
        )
        await this.repository.create({
            ...data,
            password: hashedPassword
        })
    }
}