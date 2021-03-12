import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/user';

class UserController {

    async index(request: Request, response: Response) {
        response.send({ userId: request.userId });
    }

    async create(request: Request, response: Response) {
        const { email, password, name, city, birth_date } = request.body;

        try {
            const repository = getRepository(User);

            const userExists = await repository.findOne({ where: { email } });

            console.log(userExists)

            if (userExists) {
                return response.status(409).json({
                    message: 'E-mail already registered.'
                })
            } 

            const user = repository.create({ email, password, name, city, birth_date })
            await repository.save(user);


            return response.status(201).json({
                message: 'Success'
            });

        } catch (error) {
            return response.status(500).json({
                message: 'unexpected error.'
            })
        }
    }
}

export default UserController;