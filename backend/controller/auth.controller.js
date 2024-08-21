import bcryptjs from 'bcryptjs';
import { User } from '../model/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const register = async (req, res) => {
    const { email, password } = req.body;
   try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({
        email, 
        password: hashedPassword,
    });
    await user.save();

    res.status(201).json({
        user: user,
        success:true, 
        message: "User created successfully"});
   } catch (error) {
         res.status(500).json({success:false, message: error.message});
   }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success:false, message: "Invalid Email"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({success:false, message: "Invalid Password"});
        }

        generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: user,
        });

    } catch (error) {
        console.log('Error in login', error);
        res.status(500).json({success:false, message: error.message});
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({success:true, message: "User logged out successfully"});
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(400).json({success:false, message: "User not found"});
        }
        res.status(200).json({success:true, message: "User authenticated", user: user});
    } catch (error) {
        console.log('Error in checkAuth', error);
        res.status(500).json({success:false, message: error.message});
        
    }
}