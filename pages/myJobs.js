import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { useAuth } from '../utils/context/authContext';
import { getJobsByCrew } from '../utils/data/job';

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  const getTheContent = () => {
    getJobsByCrew(user?.id).then(setJobs);
  };

  useEffect(() => {
    getTheContent();
  }, [user]);

  return (
    <>
      {jobs.map((job) => (
        <JobCard obj={job} />
      ))}
    </>
  );
}

export default MyJobs;
