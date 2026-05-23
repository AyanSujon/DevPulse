import express, { type Application, type Request, type Response } from "express";
import { userRoute } from "./modules/user/user.route";
import { authRoute } from "./modules/auth/auth.route";
import { issueRoute } from "./modules/issue/issue.route";
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