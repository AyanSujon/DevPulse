import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";

const router = Router()


// Post endpoint to create a new user
router.post('/signup', userController.createUser)










export const userRoute = router


