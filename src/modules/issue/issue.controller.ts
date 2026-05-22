// import type { Request, Response } from "express";
// import { pool } from "../../db";
// import { issueService } from "./issue.service";


// // Post endpoint to create a new issue
// const createIssue = async (req : Request, res : Response) => {
//   try {
//   const reporter_id = req.user?.id
//     console.log("Reporter ID from request:", reporter_id);
//   const payload = {
//     ...req.body,
//     reporter_id,
//   }
//   console.log("Creating issue with payload:", payload);
//     const result = await issueService.createIssueIntoDB(payload);
//     res.status(201).json({
//       success: true,
//       message: "Issue created successfully",
//       data: result.rows[0]
//     })
//     console.log("Issue created successfully:", result.rows[0]);
//   } catch (error: any) {
//     console.error("Error creating issue:", error)
//     res.status(500).json({ 
//       success: false, 
//       message: error.message,
//       error: error,
//       data: null
      
//     })
//   }
// }




// export const issueController = {
//     createIssue
// }




import type { Request, Response } from "express";
import { issueService } from "./issue.service";


const createIssue = async (req: Request, res: Response) => {
  try {
    const reporter_id = req.user?.id;
    console.log("request user form issue controller:", req.user);
    // ✅ check if reporter_id exists
    if (!reporter_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: reporter_id not found",
        data: null,
      });
    }

    const payload = {
      ...req.body,
      reporter_id,
    };

    
console.log("Creating issue with payload:", payload);
    const result = await issueService.createIssueIntoDB(payload);

    return res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const issueController = {
    createIssue
}