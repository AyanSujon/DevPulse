// import { Router, type Request, type Response } from "express";
// import { issueController } from "./issue.controller";

// const router = Router()


// // Post endpoint to create a new issue
// router.post('/', issueController.createIssue)


// export const issueRoute = router




import { Router, type Request, type Response } from "express";
import { issueController } from "./issue.controller";
import { userRole } from "../../types";
import auth from "../../middleware/auth";

const router = Router()


// Post endpoint to create a new issue
router.post('/', auth(userRole.contributor, userRole.maintainer), issueController.createIssue)
router.get("/" , issueController.getAllIssues);
router.get("/:id" , issueController.getSingleIssueById);








export const issueRoute = router
