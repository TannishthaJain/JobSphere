import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Button } from './ui/button';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [statusFilter, setStatusFilter] = useState('all'); // Filter by all, open, or closed
    const [filteredJobs, setFilteredJobs] = useState(allJobs);

    useEffect(() => {
        // Filter jobs based on searched query and status
        let filtered = allJobs.filter((job) => {
            return (
                (statusFilter === 'all' || job.status === statusFilter)
            );
        });
        setFilteredJobs(filtered);
    }, [allJobs, statusFilter]);

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(''));
        };
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold text-xl my-10">Search Results ({filteredJobs.length})</h1>
                <div className="mt-5 flex gap-4"> {/* Added gap between buttons */}
                    <Button
                        className={`px-6 py-3 rounded-lg text-white text-lg transition-all duration-300 ease-in-out
                                    ${statusFilter === 'all' ? 'bg-blue-500 shadow-md' : 'bg-gray-300 hover:bg-blue-400'}`}
                        onClick={() => setStatusFilter('all')}
                    >
                        All Jobs
                    </Button>
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
                        <span>No Jobs Found</span>
                    ) : (
                        filteredJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Browse;
