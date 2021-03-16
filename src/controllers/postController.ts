import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Post from '../models/post';
import StorageService from '../services/storage/storageService';

class PostController {
    create(request: Request, response: Response) {
        console.log(request.file)
        const { originalname: name,  size, key, location: url = "" } = request.file as any;
        console.log('name:', name)
        console.log('--------')
        console.log('size:', size)
        console.log('--------')
        console.log('key:', key)
        console.log('--------')
        console.log('url:', url)

    }
}

export default PostController;