// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import JobCard from '../components/JobCard';
import { useAuth } from '../utils/context/authContext';
import { getJobsByCrew } from '../utils/data/job';

function Home() {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();
  const userCreatedJobs = user.jobs;
  // const router = useRouter();

  const getTheContent = () => {
    getJobsByCrew(user.id).then(setJobs);
  };

  useEffect(() => {
    getTheContent();
  }, [user]);

  return (
    <>
      <Header hidden={(userCreatedJobs || jobs.length)} as="h2" content="No Jobs Yet" />
      <Segment hidden={!userCreatedJobs.length}>
        <Header as="h3">My Jobs</Header>
        {userCreatedJobs?.map((job) => (
          <JobCard key={`${job.id}author`} obj={job} />
        ))}
      </Segment>
      <Segment hidden={!jobs.length}>
        <Header as="h3">My Accepted Jobs</Header>
        {jobs.map((job) => (
          <JobCard key={job.id} obj={job} />
        ))}
      </Segment>
    </>
  );
}

export default Home;
