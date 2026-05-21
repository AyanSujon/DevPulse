import { pool } from "../../db"

import bcrypt from "bcryptjs";
import type { IIssue } from "../user/user.interface";


const createIssueIntoDB = async(payload : IIssue ) =>{
    const {title, description, type, status, reporter_id} = payload;

    const result = await pool.query(
      `INSERT INTO issues (title, description, type, status, reporter_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, type, status, reporter_id]
    )
    // delete result.rows[0].password;
    return result;
}




export const issueService ={
    createIssueIntoDB,

}