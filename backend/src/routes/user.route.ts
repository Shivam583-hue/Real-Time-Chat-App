import express from "express"
import protectRoute from "../middleware/protectRoute";
import { getUsersForSiderbar } from "../controllers/user.controller";

const router = express.Router()

router.get("/",protectRoute,getUsersForSiderbar)

export default router;