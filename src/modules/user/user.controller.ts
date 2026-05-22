import type { Request, Response } from "express";
import { userService } from "./user.service";


// Post endpoint to create a new user
const createUser = async (req : Request, res : Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0]
    })
    // console.log("User registered successfully:", result.rows[0]);
  } catch (error: any) {
    console.error("Error registering user:", error)
    res.status(500).json({ 
      success: false, 
      message: error.message,
      error: error,
      data: null
      
    })
  }
}




export const userController = {
    createUser
}