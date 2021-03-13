import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: number;
    iat: number;
    exp: number;
}

export default function authMiddleware(
    request: Request, response: Response, next: NextFunction
) {
    const { authorization } = request.headers;

    if(!authorization) {
        return response.status(401).json({
            message: 'token not found.'
        })
    }

    const token = authorization.replace('Bearer', '').trim();
    
    try {
        const data = jwt.verify(token, process.env.PRIVATE_KEY);
        
        const { id } = data as TokenPayload;

        request.userId = id;
        next();

    } catch {
        return response.status(401).json({
            message: 'invalid token.'
        })
    }
}