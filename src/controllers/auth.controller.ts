import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { loginSchema, registerSchema } from "../validators/auth.validator";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response) {
        const body = registerSchema.parse(req.body);
        await authService.register(body);
        res.status(201).json({
            message: 'User registered successfully'
        });
    }

    async login(req: Request, res: Response) {
        const body = loginSchema.parse(req.body);
        
        const result = await authService.login(body.email, body.password);

        res.status(200).json(result)
    }
}