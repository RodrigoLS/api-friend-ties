import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Post from '../models/post';

class PostController {
    create(request: Request, response: Response) {
        console.log("create post =========>")
        console.log(request)
    }
}

export default PostController;