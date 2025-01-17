import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
import { updateJob } from "../controllers/job.controller.js";
const router = express.Router();
import { closeJob } from "../controllers/job.controller.js";
import { updateJobStatus } from "../controllers/job.controller.js";

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(getJobById);
router.route("/update/:id").put(isAuthenticated, updateJob);  // Route for updating job
router.route("/close/:id").delete(isAuthenticated, closeJob);
router.route("/update-status/:id").patch(isAuthenticated, updateJobStatus);

export default router;

