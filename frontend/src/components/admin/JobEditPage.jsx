import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const JobEditPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [job, setJob] = useState({
        title: '',
        description: '',
        location: '',
        requirements: '',
        salary: '',
        status: 'open', // Add status to track open/closed
    });

    // Fetch job data by ID
    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${JOB_API_END_POINT}/get/${params.id}`, {
                    withCredentials: true,
                });

                if (data.success && data.job) {
                    setJob({
                        title: data.job.title || '',
                        description: data.job.description || '',
                        location: data.job.location || '',
                        requirements: data.job.requirements.join(', ') || '',
                        salary: data.job.salary || '',
                        status: data.job.status || 'open', // Get status from the API
                    });
                } else {
                    toast.error('Job not found.');
                    navigate('/admin/jobs');
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch job details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [params.id, navigate]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob((prev) => ({ ...prev, [name]: value }));
    };

    // Submit updated job details
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const updatedJob = {
                ...job,
                requirements: job.requirements.split(',').map((req) => req.trim()), // Convert string back to array
            };
            const { data } = await axios.put(
                `${JOB_API_END_POINT}/update/${params.id}`,
                updatedJob,
                { withCredentials: true }
            );
            if (data.success) {
                toast.success('Job updated successfully!');
                navigate('/admin/jobs');
            } else {
                toast.error(data.message || 'Failed to update job details.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update job details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Toggle job status (open/closed)
    const toggleJobStatus = async () => {
        const newStatus = job.status === 'open' ? 'closed' : 'open'; // Toggle status
        try {
            setLoading(true);
            const { data } = await axios.patch(
                `${JOB_API_END_POINT}/update-status/${params.id}`,
                { status: newStatus },
                { withCredentials: true }
            );
            if (data.success) {
                setJob((prev) => ({ ...prev, status: newStatus })); // Update local state
                toast.success(`Job ${newStatus === 'open' ? 'reopened' : 'closed'} successfully!`);
            } else {
                toast.error(data.message || 'Failed to update job status.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update job status. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto my-10">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-xl font-bold mb-4">Edit Job Posting</h1>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="title">Job Title</Label>
                            <Input
                                id="title"
                                type="text"
                                name="title"
                                value={job.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                type="text"
                                name="description"
                                value={job.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                type="text"
                                name="location"
                                value={job.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="requirements">Requirements</Label>
                            <Input
                                id="requirements"
                                type="text"
                                name="requirements"
                                value={job.requirements}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="salary">Salary</Label>
                            <Input
                                id="salary"
                                type="number"
                                name="salary"
                                value={job.salary}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Button type="submit" disabled={loading} className="flex items-center gap-2">
                            {loading && <Loader2 className="animate-spin" />}
                            Update Job
                        </Button>
                        <Button
                            type="button"
                            variant={job.status === 'open' ? 'destructive' : 'default'}
                            onClick={toggleJobStatus}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : job.status === 'open' ? (
                                'Close Job'
                            ) : (
                                'Open Job'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobEditPage;
