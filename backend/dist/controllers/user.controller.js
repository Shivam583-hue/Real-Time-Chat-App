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
export const getUsersForSiderbar = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = yield User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch (error) {
        console.error("Error in gettingUsersSidbar", error.message);
        res.json({ error: "Internal server error" });
    }
}));
