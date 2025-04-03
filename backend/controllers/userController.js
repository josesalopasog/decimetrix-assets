//Package ⬇️
import bcrypt from 'bcryptjs';

//Models ⬇️
import User from '../models/userModel.js';
import Asset from '../models/assetsModel.js';

//Utils ⬇️
import generateToken from '../utils/generateToken.js';

//Middlewares ⬇️ 
import asyncHandler from '../middlewares/asyncHandler.js';

const createUser = asyncHandler(async (req, res) => {
    const {username, email, password, role} = req.body; //Get the username, email, password and role from the request body
    if (!username || !email || !password || !role) { //Check if the all the params are provided
        return res.status(400).json({message: 'Please provide a username, email, password and role'}); //If something is missing set status code 400(Bad Request) and send the response in a json
    }

    const userExists = await User.findOne({ email }); //Check if the user with the provided email exists
    if (userExists) { //If the user exists
        return res.status(400).json({ message: 'User already exists'}); //Set the status code to 400 (Bad Request) and send the response
    }
    
    const salt = await bcrypt.genSalt(10); //Generate a salt for the password
    const hashedPassword = await bcrypt.hash(password, salt); //Hash the password with the salt

    const newUser = await User.create({ username, email, password: hashedPassword, role}); //Create a new user with the name, email, the hashed password and the role
    try{
        await newUser.save(); //Save the new user to the database

        generateToken(res, newUser._id); //Generate a token for the user
        
        return res.status(201).json({ //Set the status code to 201 (Created) and send the response
            _id: newUser._id, 
            username: newUser.username, 
            email: newUser.email, 
            role: newUser.role, 
        });
    }catch (error){
        return res.status(400).json({ message: 'Invalid user data'}); //Set the status code to 400 (Bad Request) and send the response
    }
});

const loginAuthUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; //Get the email and password from the request body
    if (!email || !password) { //Check if the email and password are provided
        return res.status(400).json({ message: 'Please provide an email and password'}); //Set the status code to 400 (Bad Request) and send the response
    }

    const userExists = await User.findOne({ email }); //Find the user with the provided email

    if (!userExists) { //If the user does not exist
        return res.status(401).json({ message: 'Invalid email'}); //Set the status code to 401 (Unauthorized) and send the response
    }else{
        const passwordMatch = await bcrypt.compare(password, userExists.password); //Compare the provided password with the hashed password
        
        if (!passwordMatch) { //If the passwords do not match
            return res.status(401).json({ message: 'Invalid password'}); //Set the status code to 401 (Unauthorized) and send the response
        }else{
            generateToken(res, userExists._id); //Generate a token for the user

            return res.status(200).json({ //Set the status code to 200 (OK) and send the response
                _id: userExists._id, //ID of the user
                username: userExists.username, //Name of the user
                email: userExists.email, //Email of the user
                role: userExists.role, //Admin status of the
            });
        }      
    }
});

const logoutCurrentUser = asyncHandler(async (req, res) => { 
    res.cookie(
        'jwt', //Set the cookie name to 'jwt'
        '', //Set the cookie to an empty string
        {
            httpOnly: true, //Set the cookie to be accessible only
            expires: new Date(0), //Set the expiration date to the past
        }
    ) 
    return res.status(200).json({ message: 'Logged out successfully'}); //Set the status code to 200 (OK) and send the response    
});

export {
    createUser,
    loginAuthUser,
    logoutCurrentUser
}