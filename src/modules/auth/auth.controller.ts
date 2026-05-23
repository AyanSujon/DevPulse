import type { Request, Response } from "express"
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";


const loginUser = async (req: Request, res: Response ) => {
    try{
        const result = await authService.loginUserIntoDB (req.body);

        sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "Login successful",
          data: result
        });

    }catch(error: any){
        console.error("Error logging:", error)
        sendResponse(res, {
          statusCode: 500,
          success: false,
          message: error.message,
          error: error,
          data: null
        })
}}

export const authController = {
    loginUser
}