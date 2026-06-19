import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { signToken } from '../util/jwt';

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

    async login(email: string, password: string) {
        const user = await this.repository.findByEmail(email);
        
        if(!user) {
            throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(password,user.password)

        if(!isValid) {
            throw new Error("Invalid credentials")
        }

        const token = signToken({
            userId: user.id,
            email: user.email
        })

        return {
            token
        }
    }
}