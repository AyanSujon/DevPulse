
import type { Request, Response } from "express";
import { getAllIssuesFromDB, getSingleIssueByIdFromDB, issueService, updateIssueByIdFromDB } from "./issue.service";
import sendResponse from "../../utils/sendResponse";

// create issues
const createIssue = async (req: Request, res: Response) => {
  try {
    const reporter_id = req.user?.id;
    // console.log("request user form issue controller:", req.user);
    // ✅ check if reporter_id exists
    if (!reporter_id) {
      sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized: reporter_id not found",
        data: null
      });
    }

    const payload = {
      ...req.body,
      reporter_id,
    };

    
// console.log("Creating issue with payload:", payload);
    const result = await issueService.createIssueIntoDB(payload);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
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

    // return res.status(200).json({
    //   success: true,
    //   data,
    // });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issues fetched successfully",
      data: data
    });
  } catch (error) {
    console.error("Get all issues error:", error);
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Failed to fetch issues",
      data: null
    });
  }
};




// Get single issue by ID
export const getSingleIssueById = async (req: Request, res: Response) => {
  const issueId = req.params.id;

  try {
    const result = await issueService.getSingleIssueByIdFromDB(issueId as string);

    if (!result) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue not found",
        data: null,
      });
    }


    sendResponse(res, {
      statusCode: 200,
      success: true, 
      message: "Issue retrieved successfully",
      data: result,
    });

  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      data: null,
    });
  }
};




// Update issue by ID
export const updateIssueById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const user = req.user;

  // console.log("request user form issue controller:", user);

  try {
    // Get existing issue
    const existingIssue = await issueService.getSingleIssueByIdFromDB(
      id as string
    );

    // console.log("Existing issue:", existingIssue);

    // Check if issue exists
   if (!existingIssue) {
  // return res.status(404).json({
  //   success: false,
  //   message: "Issue not found",
  //   data: null,
  // });
  return sendResponse(res, {
    statusCode: 404,
    success: false, 
    message: "Issue not found",
    data: null,
  });
}


    // Access Control Logic
    if (user?.role === "maintainer") {
      // Maintainer can update any issue
    } else if (user?.role === "contributor") {
      const isOwner = existingIssue.reporter?.id === user?.id;
      const isOpen = existingIssue.status === "open";

      if (!isOwner || !isOpen) {
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "Contributors can only update their own open issues",
          data: null,
        });
      }
    } else {
      // return res.status(403).json({
      //   success: false,
      //   message: "Unauthorized access",
      //   data: null,
      // });
      return sendResponse(res, {
        statusCode: 403,
        success: false, 
        message: "Unauthorized access",
        data: null,
      });
    }

    // Update issue
    const updatedIssue = await issueService.updateIssueByIdFromDB(
      id as string,
      payload
    );

    // console.log("Updated issue:", updatedIssue.rows[0]);

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: updatedIssue.rows[0],
    });
  } catch (error: any) {
    console.error("Error updating issue:", error);

    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};






// Delete issue by ID
export const deleteIssueById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedIssue = await issueService.deleteIssueByIdFromDB(id as string);

    if (deletedIssue.rowCount === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue not found",
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,  
      message: "Issue deleted successfully",
      data: {},
    });
  } catch (error: any) {
    console.error("Error deleting issue:", error);

    return sendResponse(res, {
      statusCode: 500,
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
    deleteIssueById,
}