import { Router, type Request, type Response } from "express";
import { issueController } from "./issue.controller";

const router = Router()


// Post endpoint to create a new issue
router.post('/', issueController.createIssue)










export const issueRoute = router


