import jwt from 'jsonwebtoken';


export const sendCookies = (user, res, statusCode=200, message) => {

    const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET);

    res
        .status(statusCode )
        .cookie("token", token, {
            httpOnly : true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            sameSite : process.env.NODE_ENV === "Development"? "lax" : "none",
            secure: process.env.NODE_ENV === "Development"? false : true, // Use secure cookies as sameSite is set to "none"
        })
        .json({
            success: true,
            message : message,
        });
};    