import express, { type Application, type Request, type Response } from "express";

import { pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { authRoute } from "./modules/auth/auth.route";
import auth from "./middleware/auth";
import { issueRoute } from "./modules/issue/issue.route";
import { userRole } from "./types";
import cors from "cors";
import config from "./config";
import globalErrorHandler from "./middleware/glovalErrorHandlar";

const app: Application = express()

const corsOptions = {
  origin: config.corsOrigin,
}


app.use(express.json());
app.use(cors(corsOptions));




// Post endpoint to create a new user
app.use("/api/auth", userRoute);
app.use("/api/auth", authRoute);
app.use('/api/issues',  issueRoute);




// Get endpoint to retrieve all users
app.get('/api/users', auth(userRole.contributor, userRole.maintainer), async (req : Request, res : Response) => {
  // console.log("Retrieving all users", req.user); // Log the user information from the request
  try {
    const result = await pool.query(`SELECT * FROM users`)
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows
      })
    // console.log("Users retrieved successfully:", result.rows);
  } catch (error: any) {

    console.error("Error retrieving users:", error)
    res.status(500).json({ 
      success: false, 
      message: error.message,
      error: error,
      data: null
      
    })
  }
})




// Health check endpoint
app.get('/', (req : Request, res : Response) => {
  res.status(200).json({ 
    message: `DevPulse Server is listening `,
    projectName: 'DevPulse',
    version: '1.0.0',
    developer: 'Ayan Sujon',
    website: 'https://www.ayansujon.com',
    Linkedin: 'https://www.linkedin.com/in/ayansujon/',
  })
})

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;