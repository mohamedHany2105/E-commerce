import Router from "express";
import {signIn,signOut,signUp,google,facebook}from '../controller/auth.controller.js'
const authRouter = Router();

authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);
authRouter.post("/signout", signOut);
authRouter.post("/google", google);
authRouter.post("/facebook", facebook);

export default authRouter;
