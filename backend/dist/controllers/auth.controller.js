var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, username, password, confirmPassword, gender, profilePic } = req.body;
        if (password != confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
        const user = yield User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        //hash password  
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: profilePic,
        });
        yield newUser.save();
        generateTokenAndSetCookie(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            gender: newUser.gender,
            profilePic: newUser.profilePic
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
export const login = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User.findOne({ username: username });
        if (!user) {
            res.json({ Error: "user not found in database please sign up" });
        }
        const isPasswordCorrect = yield bcrypt.compare(password, (user === null || user === void 0 ? void 0 : user.password) || "");
        if (!isPasswordCorrect) {
            res.json({ Error: " incorrect password" });
        }
        generateTokenAndSetCookie(user === null || user === void 0 ? void 0 : user._id, res);
        res.status(200).json({
            _id: user === null || user === void 0 ? void 0 : user._id,
            fullName: user === null || user === void 0 ? void 0 : user.fullName,
            username: user === null || user === void 0 ? void 0 : user.username,
            profilePic: user === null || user === void 0 ? void 0 : user.profilePic
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
export const logout = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "logged out successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
