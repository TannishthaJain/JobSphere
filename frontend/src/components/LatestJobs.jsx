import React, { useState, useEffect } from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const [statusFilter, setStatusFilter] = useState('open'); // Filter by 'open' jobs by default
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        // Filter jobs based on status
        const jobs = allJobs.filter(job => job.status === statusFilter);
        setFilteredJobs(jobs);
    }, [allJobs, statusFilter]);

    return (
        <div className="max-w-7xl mx-auto my-20">
            <h1 className="text-4xl font-bold">
                <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
            </h1>
            <div className="mt-5 flex gap-4"> {/* Add a gap between buttons */}
                <Button
                    className={`px-6 py-3 rounded-lg text-white text-lg transition-all duration-300 ease-in-out 
                                ${statusFilter === 'open' ? 'bg-green-500 shadow-md' : 'bg-gray-300 hover:bg-green-400'}`}
                    onClick={() => setStatusFilter('open')}
                >
                    Open Jobs
                </Button>
                <Button
                    className={`px-6 py-3 rounded-lg text-white text-lg transition-all duration-300 ease-in-out
                                ${statusFilter === 'closed' ? 'bg-red-500 shadow-md' : 'bg-gray-300 hover:bg-red-400'}`}
                    onClick={() => setStatusFilter('closed')}
                >
                    Closed Jobs
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 my-5">
                {filteredJobs.length <= 0 ? (
                    <span>No Jobs Available</span>
                ) : (
                    filteredJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                )}
            </div>
        </div>
    );
};

export default LatestJobs;
