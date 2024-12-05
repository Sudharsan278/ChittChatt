import express from "express";
import {signup, login, logout, updateProfile, userDetails, updateName, forgotPassword, resetPassword} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/updateprofile", protectRoute, updateProfile);

router.put("/updatename", protectRoute, updateName);

router.post("/forgotpassword", forgotPassword)

router.patch("/resetpassword/:token", resetPassword)

router.get("/check", protectRoute, userDetails);

export default router;