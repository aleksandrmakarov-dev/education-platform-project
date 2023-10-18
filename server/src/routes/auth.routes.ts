import express from "express";
import AuthController from "../controllers/auth.controller";
import UserModel from "../models/user.model";
import { connect } from "../database/mongoose";
import RoleBasedProtectionMiddleware from "../middlewares/role-based-protection.middleware";

const AuthRouter = express.Router();

AuthRouter.get("/current-user", async function (req, res) {
  await connect();
  const user = await UserModel.findById(req.currentUser.id);
  return res.status(200).json({ user: user });
});

AuthRouter.post("/refresh-token", AuthController.refreshToken);

AuthRouter.post("/sign-out", AuthController.signOut);

AuthRouter.get("/sign-in/google", AuthController.signInWithGoogle);

AuthRouter.get("/callback/oauth/google", AuthController.googleOAuthCallback);

AuthRouter.get("/test", RoleBasedProtectionMiddleware(), (req, res) => {
  return res.status(200).json({ msg: "Hello!" });
});

export default AuthRouter;
