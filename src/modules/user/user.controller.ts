import type { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";


// Post endpoint to create a new user
const createUser = async (req : Request, res : Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result.rows[0]
    });
    // console.log("User registered successfully:", result.rows[0]);
  } catch (error: any) {
    console.error("Error registering user:", error)
    sendResponse(res, {
      statusCode: 500,
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