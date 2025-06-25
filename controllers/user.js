import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";



export const getAllUsers = async(req, res) => {
    
    const users = await User.find({});  
    // console.log(req.query);
    res.json({
        success: true,
        users,
    });
}

// export const createUser = async(req, res) => {
    
//     const {name, email, password} = req.body;
//     await User.create({
//         name,
//         email,
//         password
//     });

//     res.status(201).cookie("maama","tata").json({
//         success: true,
//         message: "User Created",
//     });
// }

export const login = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}).select("+password"); // select the password field as it is not selected by default
        if(!user){
            return next(new ErrorHandler("Invalid Email or Password", 400));
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid Email or Password", 400));
        }
        sendCookies(user, res, 200, `Welcome back, ${user.name}`); 
    } catch (error) {
        next(new ErrorHandler(error.message));
    }
}


export const createUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        let user = await User.findOne({email});
        if(user){
            return next(new ErrorHandler("User already exists", 400));
        } 
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        // const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        // res.status(201).cookie("token",token, {
        //     httpOnly : true,
        //     maxAge: 1000 * 60 * 60 * 24, // 1 day
        // }).json({
        //     success: true,
        //     message: "User Created Successfully",
        // });
        sendCookies(user, res, 201, "User Created Successfully");
    } catch (error) {
        next(new ErrorHandler(error.message));
    }
};    


export const getMyProfile = (req, res) => {
    
//    const {token} = req.cookies; 
//    console.log(token);

//    if(!token){
//         return res.status(404).json({
//            success: false,
//            message: "Please Login First",
//        });
//    }
   
//    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

//    const user = await User.findById(decodedToken._id);
    res.status(200).json({
        success: true,
        user: req.user,
    });
}    

export const logout = (req, res) => {
    res.status(200).cookie("token","",{
        expires : new Date(Date.now()),
        sameSite : process.env.NODE_ENV === "Development"? "lax" : "none",
        secure: process.env.NODE_ENV === "Development"? false : true, // Use secure cookies as sameSite is set to "none"
    })
    .json({
        success: true,
        message: "Logged out successfully",
    });
}




export const specialUser = (req, res) => {
    res.json({
        success: true,
        message: "This is a special route",
    });
}

export const getUserById = async(req, res) => {
    // const {id} = req.query; query is typed after a question mark in the url 
    const {id} = req.params; // params is typed after a slash in the url
    const user = await User.findById(id);
    // if(!user){
    //     return res.status(404).json({
    //         success: false,
    //         message: "User not found",
    //     });
    // }
    console.log(req.params);
    res.json({
        success: true,
        user,
    });
};


export const updateUserById = async(req, res) => {
    // const {id} = req.query; query is typed after a question mark in the url 
    const {id} = req.params; // params is typed after a slash in the url
    const user = await User.findById(id);
    // if(!user){
    //     return res.status(404).json({
    //         success: false,
    //         message: "User not found",
    //     });
    // }
    console.log(req.params);
    res.json({
        success: true,
        message: "User updated",
    });
};

export const deleteUserById = async(req, res) => {
    // const {id} = req.query; query is typed after a question mark in the url 
    const {id} = req.params; // params is typed after a slash in the url
    const user = await User.findById(id);
    // if(!user){
    //     return res.status(404).json({
    //         success: false,
    //         message: "User not found",
    //     });
    // }
    // console.log(req.params);
    // await user.remove();
    await user.deleteOne();
    res.json({
        success: true,
        message: "User deleted",
    });
};