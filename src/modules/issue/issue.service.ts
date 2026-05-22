import { pool } from "../../db"
import type { IIssue } from "./issue.interface";



const createIssueIntoDB = async(payload : IIssue ) =>{
        console.log("Creating issue with payload:", payload);
        
        const {title, description, type, status, reporter_id} = payload;
        const finalStatus = status ?? "open"; // 👈 handle null/undefined here

    const result = await pool.query(
      `INSERT INTO issues (title, description, type, status, reporter_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, type, finalStatus, reporter_id]
    )
    return result;
}




export const issueService ={
    createIssueIntoDB,

}