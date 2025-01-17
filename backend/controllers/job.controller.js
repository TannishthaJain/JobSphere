import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// Update a job
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, description, requirements, salary, location } = req.body;
        const requirementsArray = Array.isArray(requirements) ? requirements : requirements.split(',').map((req) => req.trim());

        // Validate the inputs (you can add more validations here)
        if (!title || !description || !requirements || !salary || !location) {
            return res.status(400).json({
                message: "Some fields are missing.",
                success: false
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(jobId, {
            title,
            description,
            requirements: requirementsArray, // assuming it's a comma-separated string
            salary: Number(salary),
            location
        }, { new: true });

        if (!updatedJob) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully.",
            job: updatedJob,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update job.",
            success: false
        });

    }
};
export const closeJob = async (req, res) => {
    const { id } = req.params;
    try {
      const job = await Job.findById(id);
      if (!job) {
        return res.status(404).json({ success: false, message: 'Job not found.' });
      }
  
      // Here you can set the job as closed by updating its status or any other field.
      job.status = 'closed';  // Example: assuming you're marking the job as closed
  
      await job.save();
  
      return res.status(200).json({ success: true, message: 'Job closed successfully!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Failed to close job.' });
    }
  };
  
// Update job status (open/close)
export const updateJobStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Expecting 'open' or 'closed'

    try {
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found.",
            });
        }

        job.status = status; // Update status field
        await job.save();

        return res.status(200).json({
            success: true,
            message: `Job status updated to ${status}.`,
            job,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update job status.",
        });
    }
};
