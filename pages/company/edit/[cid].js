import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import CompanyForm from '../../../components/CompanyForm';
import { getCompany } from '../../../utils/data/company';

function Admin() {
  const [company, setCompany] = useState({});
  const router = useRouter();
  const { cid } = router.query;

  const getTheContent = () => {
    getCompany(cid).then(setCompany);
  };

  useEffect(() => {
    getTheContent();
  }, [router]);

  return (
    <CompanyForm obj={company} />
  );
}

export default Admin;
