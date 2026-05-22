import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IAuth } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payload: IAuth) => {
    const { email, password } = payload;
    // check if the user exists in the database -> Done 



    const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (userData.rows.length === 0) {
        throw new Error("Invalid Credentials: User not found");
    }

    // compare the provided password with the stored password -> Done
    const user = userData.rows[0];
    const matchPassword = await bcrypt.compare(password, user.password);
    // console.log("matchPassword", matchPassword);
    if (!matchPassword) {
        throw new Error("Invalid Credentials: Incorrect password");
    }


    // Generate a JWT token if the credentials are valid -> Done
    const jwtpayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }
    const token: string = jwt.sign(jwtpayload, config.jwtSecret, { expiresIn: '1d' });

    // Return the user data and token if the login is successful
    return { token, user: jwtpayload };

};

export const authService = {
    loginUserIntoDB,

}