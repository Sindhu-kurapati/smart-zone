const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const HttpError = require('../models/errorModel');


//REGISTER NEW USER
//POST : api/users/user-register
//Unprotected
const registerUser = async (req, res, next) =>{
    try {
        const {name, email, password, password2} = req.body;
        if(!name || !email || !password){
            return next(new HttpError("Fill in all fileds.", 422))
        }

        const newEmail = email.toLowerCase()
        const emailExists = await User.findOne({email: newEmail})

        if(emailExists){
            return next(new HttpError("Email already exists.", 422))
        }

        if((password.trim()).length < 8){
            return next(new HttpError("Password should be atleast 8 characters.", 422))
        }
        if(password != password2){
            return next(new HttpError("Password do not match.", 422))
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({name, email:newEmail, password: hashedPassword});
        res.status(201).json(`New User ${newUser.email} registered.`)
    } catch (error) {
        return next(new HttpError("User registration failed.", 422))
    }
}


//LOGIN A REGISTERED USER
//POST : api/users/user-login
//UNPROTECTED
const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return next(new HttpError("Fill in all fields.", 422))
        }

        const newEmail = email.toLowerCase()
        const user = await User.findOne({email: newEmail})
        if(!user){
            return next(new HttpError ("Invalid User.", 422))
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return next(new HttpError("Invalid Password.", 422))
        }

        const {_id: id, name} = user;
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(200).json({token, id, name})
    } catch (error) {
        return next(new HttpError("Login failed. Please check your details.", 422))
    }
}


module.exports = {registerUser, loginUser}