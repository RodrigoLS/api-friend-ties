import jwt from 'jsonwebtoken';

const generateJWT = (userId) => {
    return jwt.sign({ id: userId }, process.env.PRIVATE_KEY, { expiresIn: '1d' })
}

export default generateJWT;