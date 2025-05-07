import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { configDotenv } from 'dotenv';
configDotenv();



export const login = async (req, res) => {
    const { email, password } = req.body;
    
    // if(!email) {
    //     return res.status(400).json(400, 'email is required');
    // }

    const user = await User.findOne({email});
    
    if(!user) {
        return res.status(404).json({
            message: 'User does not exist'
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) {
        return res.status(401).json({
            message: 'Incorrect Password'
        });
    }
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '2h'});

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", token, options)
    .json({ user: user, token }, {message: "User logged In Successfully"} )
}


export const register = async(req, res) => {
    const { email, name, phone_number, password } = req.body;

    if ( [name, email, phone_number, password].some((field) => field?.trim() === "")) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    try {
        const existedUser = await User.findOne({email});
        if(existedUser) {
            return res.status(409).json({
                message: "User with email or username already exists"
            });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            name,
            email, 
            phone_number,
            password: hashedPassword
        });
    
        const createdUser = await User.findById(user._id);
    
        if(!createdUser) {
            return res.status(400).json({
                message: "Something went wrong while registering the user"
            })
        }
    
        return res
        .status(201)
        .json({
            createdUser,
            message: "User registered Successfully"
        })
    
    } catch (error) {
        throw new Error(500, 'Something wrong while registering user');
    }
}