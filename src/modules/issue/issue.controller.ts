import type { Request, Response } from "express";
import { pool } from "../../db";
import { issueService } from "./issue.service";


// Post endpoint to create a new issue
const createIssue = async (req : Request, res : Response) => {
  try {
    const result = await issueService.createIssueIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result.rows[0]
    })
    console.log("Issue created successfully:", result.rows[0]);
  } catch (error: any) {
    console.error("Error creating issue:", error)
    res.status(500).json({ 
      success: false, 
      message: error.message,
      error: error,
      data: null
      
    })
  }
}




export const issueController = {
    createIssue
}