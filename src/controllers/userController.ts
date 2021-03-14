import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/user';

class UserController {

    async index(request: Request, response: Response) {
        try {
            const repository = getRepository(User);
            const listUsers = await repository.find();

            return response.status(200).json({
                message: 'Success',
                users: listUsers
            })

        } catch {
            return response.status(500).json({
                message: 'the request could not be completed.'
            })
        }
    }

    async getUser(request: Request, response: Response) {
        const userId = request.params.userId;

        try {
            const repository = getRepository(User);
            const user = await repository.findOne({ where: { id: userId } });

            if(!user) {
                return response.status(404).json({
                    message: 'User does not exist.'
                });
            }

            return response.status(200).json(user);

        } catch {
            return response.status(500).json({
                message: 'the request could not be completed.'
            })
        }
    }

    async create(request: Request, response: Response) {
        const { email, password, name, city, birth_date } = request.body;

        try {
            const repository = getRepository(User);

            const userExists = await repository.findOne({ where: { email } });

            if (userExists) {
                return response.status(409).json({
                    message: 'E-mail already registered.'
                })
            } 

            const user = repository.create({ email, password, name, city, birth_date })
            await repository.save(user);

            const userSave = await repository.findOne({ where: { email }});


            return response.status(201).json({
                message: 'Success',
                user: userSave
            });

        } catch (error) {
            return response.status(500).json({
                message: 'unexpected error.'
            })
        }
    }

    async edit(request: Request, response: Response) {
        const { email, name, city, birth_date } = request.body;

        try {
            const userId = Number(request.params.userId);

            const repository = getRepository(User);

            const user = await repository.findOne({id: userId});

            if(!user) {
                return response.status(404).json({
                    message: 'User does not exist.'
                });
            }

            let updateUser = {
                ...user,
                email,
                name,
                city,
                birth_date
            }

            await repository.save(updateUser);

            delete updateUser.password;

            response.status(200).json(updateUser);
            
        } catch {
            return response.status(500).json({
                message: 'unexpected error.'
            }) 
        }
    }
}

export default UserController;