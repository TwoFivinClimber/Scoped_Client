import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import CompanyDetail from '../../components/CompanyDetail';
import { getCompany } from '../../utils/data/company';

function CompanyPage() {
  const router = useRouter();
  const { cid } = router.query;
  const [company, setCompany] = useState({});

  const getTheContent = () => {
    getCompany(cid).then(setCompany);
  };

  useEffect(() => {
    getTheContent();
  }, [router, cid]);

  return (
    <CompanyDetail obj={company} />
  );
}

export default CompanyPage;
