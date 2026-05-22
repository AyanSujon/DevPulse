// import type { NextFunction, Request, Response } from "express";
// import config from "../config";
// import jwt, { type JwtPayload } from "jsonwebtoken";
// import { pool } from "../db";



// const auth = () => {

//     return async(req: Request, res: Response, next: NextFunction) => {
//       try{
//         const token = req.headers.authorization;

//         if (!token) {
//           return res.status(401).json({
//             success: false,
//             message: 'Unauthorized access!!',
//         });
//         }

//         const decodedToken = jwt.verify(token, config.jwtSecret) as JwtPayload;
//         const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [decodedToken.email]);
//         const user = userData.rows[0];
        
//         if (userData.rows.length === 0) {
//           res.status(404).json({
//             success: false,
//             message: 'User not found!!',
//         });
//         }

//         if(!user.role) {
//           return res.status(403).json({
//             success: false,
//             message: 'Forbidden access!!',
//         });
//         }

//         // added custom 'user' property to the request object "/src/middleware/index.d.ts"
//         req.user = decodedToken;

//         next();
//       }catch(error: any){
//         next(error);
//       }
//       }
    
// };

// export default auth;








import type { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db";
import type { UserRole } from "../types";




const auth = (...roles: UserRole[]) => {

    return async(req: Request, res: Response, next: NextFunction) => {
      try{
        const token = req.headers.authorization;

        if (!token) {
          return res.status(401).json({
            success: false,
            message: 'Unauthorized access!!',
        });
        }

        const decodedToken = jwt.verify(token, config.jwtSecret) as JwtPayload;
        console.log("Decoded token:", decodedToken);
        const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [decodedToken.email]);
        const user = userData.rows[0];
        
        if (userData.rows.length === 0) {
          return res.status(404).json({
            success: false,
            message: 'User not found!!',
        });
        }

        if(!user.role) {
          return res.status(403).json({
            success: false,
            message: 'Forbidden access!!',
        });
        }
        // Check if the user's role is included in the allowed roles
        if (roles.length && !roles.includes(user.role)) {
          return res.status(403).json({
            success: false,
            message: 'Forbidden access!!',
        });
        }



        // added custom 'user' property to the request object "/src/middleware/index.d.ts"
        req.user = decodedToken as JwtPayload;

        next();
      }catch(error: any){
        next(error);
      }
      }
    
};

export default auth;
