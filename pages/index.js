import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { useAuth } from '../utils/context/authContext';
import { getJobs } from '../utils/data/job';

function Home() {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  const getTheContent = () => {
    getJobs().then(setJobs);
  };

  useEffect(() => {
    getTheContent();
  }, [user]);

  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.id} obj={job} />
      ))}
    </>
  );
}

export default Home;
