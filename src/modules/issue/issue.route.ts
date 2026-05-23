
import { Router } from "express";
import { issueController } from "./issue.controller";
import { userRole } from "../../types";
import auth from "../../middleware/auth";

const router = Router()


// Post endpoint to create a new issue
router.post('/', auth(userRole.contributor, userRole.maintainer), issueController.createIssue)
router.get("/" , issueController.getAllIssues);
router.get("/:id" , issueController.getSingleIssueById);
router.patch("/:id",  auth(userRole.contributor, userRole.maintainer), issueController.updateIssueById);
router.delete("/:id", auth( userRole.maintainer), issueController.deleteIssueById);







export const issueRoute = router
