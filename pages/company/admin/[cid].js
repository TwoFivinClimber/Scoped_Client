import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import CompanyDetail from '../../../components/CompanyDetail';
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
    // eslint-disable-next-line react/jsx-boolean-value
    <CompanyDetail admin={true} obj={company} onUpdate={getTheContent} />
  );
}

export default Admin;
