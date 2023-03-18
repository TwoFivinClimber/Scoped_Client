import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Blog from '../../components/Blog';
import CompanyDetail from '../../components/CompanyDetail';
import { getCompanyBlog } from '../../utils/data/blog';
import { getCompany } from '../../utils/data/company';

function CompanyPage() {
  const router = useRouter();
  const { cid } = router.query;
  const [company, setCompany] = useState({});
  const [blogs, setBlogs] = useState([]);

  const getTheContent = () => {
    getCompany(cid).then(setCompany);
    getCompanyBlog(cid).then(setBlogs);
  };

  useEffect(() => {
    getTheContent();
  }, [router, cid]);

  return (
    <>
      <CompanyDetail admin={false} obj={company} onUpdate={getTheContent} />
      <Blog cid={company.id} blogs={blogs} onUpdate={getTheContent} />
    </>
  );
}

export default CompanyPage;
