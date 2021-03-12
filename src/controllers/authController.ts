import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/user';
import bcrybt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
    async authenticate(request: Request, response: Response) {
        const repository = getRepository(User);
        const { email, password } = request.body;

        const user = await repository.findOne({ where: { email } });

        if(!user) {
            return response.status(401).json({
                message: "incorrect email or password"
            })
        }

        const isValidPassword = await bcrybt.compare(password, user.password);

        if(!isValidPassword) {
            return response.status(401).json({
                message: "incorrect email or password"
            })
        }

        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' })

        delete user.password;

        return response.status(200).json({
            user,
            token
        })
    }
}

export default AuthController;