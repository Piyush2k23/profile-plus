import jwt from "jsonwebtoken";


const generateToken = async() => {
    await jwt.sign('token', process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
}