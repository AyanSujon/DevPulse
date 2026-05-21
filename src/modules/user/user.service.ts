import { pool } from "../../db"
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";


const createUserIntoDB = async(payload : IUser ) =>{
    const {name, email, password, role} = payload;

    const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
      `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, hashedPassword, role]
    )
    delete result.rows[0].password;
    return result;
}




export const userService ={
    createUserIntoDB,

}