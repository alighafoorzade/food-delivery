import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { registerSchema } from "../validators/auth.validator";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response) {
        const body = registerSchema.parse(req.body);
        await authService.register(body);
        res.status(201).json({
            message: 'User registered successfully'
        });
    }
}