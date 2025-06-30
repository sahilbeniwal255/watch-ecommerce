import validator from 'validator'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}


//controls logic for user logins/signups

//it contain three controller functions

const loginUser = async (req, res) => {

    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success : false, message : 'user doesnot exist'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = createToken(user._id);
            res.json({success : true, token : token});
        }else{
            res.json({success : false, msg : 'inavlid credentials'})
        }
    } catch (error) {
        console.log(error);
        res.send({ success : false , msg : error});
    }

}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success : false, message : 'user already exist'});
        }
        if(!validator.isEmail(email)){
            return res.json({success : false, msg : 'enter valid email'});
        }
        if(password.length < 8){
            return res.send({success : false, msg : 'enter longer password'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = userModel({
            name, email, password: hashedPassword
        });

        const user = await newUser.save();

        //id property of user is autogeneratted in mongodb

        const token = createToken(user._id);

        res.json({success : true, token : token});
 
    } catch (error) {
        console.log(error);
        res.send({ success : false , msg : error});
    }
}

const adminLogin = async (req, res) => {

    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success : true, token});
        }else{
            res.json({success: false, msg : 'wrong credenntials'})
        }
    } catch (error) {
        
    }
    
}

export {loginUser, registerUser, adminLogin}