import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import JobForm from '../../../components/JobForm';
import { getSingleJob } from '../../../utils/data/job';

function EditJobDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState({});

  useEffect(() => {
    getSingleJob(id).then(setJob);
  }, [id, router]);

  return (
    <JobForm obj={job} />
  );
}

export default EditJobDetail;
