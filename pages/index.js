import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { useAuth } from '../utils/context/authContext';
import { getJobsByCrew } from '../utils/data/job';

function Home() {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  const getTheContent = () => {
    getJobsByCrew(user.id).then(setJobs);
  };

  useEffect(() => {
    getTheContent();
  }, [user]);

  return (
    <div className="index-jobs-div">
      {jobs.map((job) => (
        <JobCard key={job.id} obj={job} />
      ))}
    </div>
  );
}

export default Home;
