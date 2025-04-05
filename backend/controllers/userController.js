//Package ⬇️
import bcrypt from "bcryptjs";
//Models ⬇️
import User from "../models/userModel.js";
//Utils ⬇️
import generateToken from "../utils/generateToken.js";
//Middlewares ⬇️
import asyncHandler from "../middlewares/asyncHandler.js";
import { io } from "../server.js"

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body; //Get the username, email, password and role from the request body
  if (!username || !email || !password || !role) {
    //Check if the all the params are provided
    return res
      .status(400)
      .json({ message: "Please provide a username, email, password and role" }); //If something is missing set status code 400(Bad Request) and send the response in a json
  }

  const userExists = await User.findOne({ email }); //Check if the user with the provided email exists
  if (userExists) {
    //If the user exists
    return res.status(400).json({ message: "User already exists" }); //Set the status code to 400 (Bad Request) and send the response
  }

  const salt = await bcrypt.genSalt(10); //Generate a salt for the password
  const hashedPassword = await bcrypt.hash(password, salt); //Hash the password with the salt

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  }); //Create a new user with the name, email, the hashed password and the role
  try {
    await newUser.save(); //Save the new user to the database
    io.emit("userCreated", { //Emit WS event when a new user is created
      message: "New user has been created",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
    return res.status(201).json({
      //Set the status code to 201 (Created) and send the response
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    return res.status(400).json({ message: "Invalid user data" }); //Set the status code to 400 (Bad Request) and send the response
  }
});

const loginAuthUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; //Get the email and password from the request body
  if (!email || !password) {
    //Check if the email and password are provided
    return res
      .status(400)
      .json({ message: "Please provide an email and password" }); //Set the status code to 400 (Bad Request) and send the response
  }

  const userExists = await User.findOne({ email }); //Find the user with the provided email

  if (!userExists) {
    //If the user does not exist
    return res.status(401).json({ message: "Invalid email" }); //Set the status code to 401 (Unauthorized) and send the response
  } else {
    const passwordMatch = await bcrypt.compare(password, userExists.password); //Compare the provided password with the hashed password

    if (!passwordMatch) {
      //If the passwords do not match
      return res.status(401).json({ message: "Invalid password" }); //Set the status code to 401 (Unauthorized) and send the response
    } else {
      generateToken(res, userExists._id); //Generate a token for the user

      return res.status(200).json({
        //Set the status code to 200 (OK) and send the response
        _id: userExists._id, //ID of the user
        username: userExists.username, //Name of the user
        email: userExists.email, //Email of the user
        role: userExists.role, //Admin status of the
      });
    }
  }
});

const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  return res.status(200).json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
  });
};

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie(
    "jwt", //Set the cookie name to 'jwt'
    "", //Set the cookie to an empty string
    {
      httpOnly: true, //Set the cookie to be accessible only
      expires: new Date(0), //Set the expiration date to the past
    }
  );
  return res.status(200).json({ message: "Logged out successfully" }).clearCookie('jwt'); //Set the status code to 200 (OK) and send the response
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}); //Find all the users in the database
  return res.json(users); //Send the users as a response
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); //Find the user by the ID in the request

  if (!user) {
    //If the user is not found
    return res.status(404).json({ message: "User not found" }); //Set the status code to 404 (Not Found) and send the response
  } else {
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); //Find the user by the ID in the request

  if (!user) {
    //If the user is not found
    return res.status(404).json({ message: "User not found" }); //Set the status code to 404 (Not Found) and send the response
  } else {
    const { username, email, password, role } = req.body; //Get the name, email, password, and isAdmin from the request body

    if (username) user.username = username; //If the name is provided, set the name of the user
    if (email) user.email = email; //If the email is provided, set the email of the user
    if (password) {
      //If the password is provided
      const salt = await bcrypt.genSalt(10); //Generate a salt for the password
      user.password = await bcrypt.hash(password, salt); //Hash the password with the salt
    }
    if (role) user.role = role; //If the role is provided, set the admin status of the user

    await user.save(); //Save the updated user to the database
    io.emit("userUpdated", { //Emit WS event when user is updated
      message: "User has been updated",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
    return res.json({
      //Send the updated user as a response
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); //Find the user by the ID in the request

  if (!user) {
    //If the user is not found
    return res.status(404).json({ message: "User not found" }); //Set the status code to 404 (Not Found) and send the response
  } else {
    if (user.role === "admin") {
      //If the user is an admin
      return res.status(400).json({ message: "Cannot delete admin user" }); //Set the status code to 400 (Bad Request) and send the response
    } else {
      await User.deleteOne({ _id: user._id }); //Delete the user from the database
      io.emit("userDeleted", { //Emit WS event when the user is deleted
        message: "User has been deleted",
        userId: user._id,
      });
      return res.json({ message: "User removed" }); //Send a success message as a response
    }
  }
});

export {
  createUser,
  loginAuthUser,
  getCurrentUser,
  logoutCurrentUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
