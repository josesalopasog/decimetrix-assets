import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => { //Create a function to generate a token
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { //Create a token with the user ID and the JWT secret
        expiresIn: '30d', //Set the expiration time of the token to
    });

    res.cookie('jwt', token, { //Set the token as a cookie
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //Set the expiration time of the cookie
        secure: process.env.NODE_ENV === 'development', //Set the cookie to be secure in production
        httpOnly: true, //Set the cookie to be accessible only by the server
        sameSite: 'strict', //Set the cookie to be sent only to the same site
    });

    return token;
}

export default generateToken; //Export the generateToken function for use in other files
