

// import type { Request, Response } from "express";
// import { issueService } from "./issue.service";


// const createIssue = async (req: Request, res: Response) => {
//   try {
//     const reporter_id = req.user?.id;
//     console.log("request user form issue controller:", req.user);
//     // ✅ check if reporter_id exists
//     if (!reporter_id) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized: reporter_id not found",
//         data: null,
//       });
//     }

//     const payload = {
//       ...req.body,
//       reporter_id,
//     };

    
// console.log("Creating issue with payload:", payload);
//     const result = await issueService.createIssueIntoDB(payload);

//     return res.status(201).json({
//       success: true,
//       message: "Issue created successfully",
//       data: result.rows[0],
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//       data: null,
//     });
//   }
// };

// export const issueController = {
//     createIssue
// }













import type { Request, Response } from "express";
import { getAllIssuesFromDB, issueService, updateIssueByIdFromDB } from "./issue.service";

// create issues
const createIssue = async (req: Request, res: Response) => {
  try {
    const reporter_id = req.user?.id;
    // console.log("request user form issue controller:", req.user);
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

    
// console.log("Creating issue with payload:", payload);
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














// Get all issues
export const getAllIssues = async (req: Request, res: Response) => {
  try {
    const data = await getAllIssuesFromDB(req.query);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Get all issues error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch issues",
    });
  }
};




// Get single issue by ID
export const getSingleIssueById = async (req: Request, res: Response) => {
  const issueId = req.params.id;

  try {
    const result = await issueService.getSingleIssueByIdFromDB(issueId as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Issue retrieved successfully",
      data: result,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};










export const updateIssueById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const updatedIssue = await updateIssueByIdFromDB(id as string, payload);
    console.log("Updated issue:", updatedIssue.rows[0]);

    if (updatedIssue.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: updatedIssue.rows[0],
    });
  } catch (error: any) {
    console.error("Error updating issue:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};































export const issueController = {
    createIssue,
    getAllIssues,
    getSingleIssueById, 
    updateIssueById,
}