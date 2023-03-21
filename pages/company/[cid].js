import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Blog from '../../components/Blog';
import CompanyDetail from '../../components/CompanyDetail';
import { useAuth } from '../../utils/context/authContext';
import { getCompanyBlog } from '../../utils/data/blog';
import { getCompany } from '../../utils/data/company';

function CompanyPage() {
  const router = useRouter();
  const { cid } = router.query;
  const [company, setCompany] = useState({});
  const [blogs, setBlogs] = useState([]);
  const { user } = useAuth();

  const getTheContent = () => {
    getCompany(cid, user.id).then(setCompany);
    getCompanyBlog(cid).then(setBlogs);
  };

  useEffect(() => {
    if (user) {
      getTheContent();
    }
  }, [user, router, cid]);

  return (
    <>
      <CompanyDetail employees={company.employees} company={company} onUpdate={getTheContent} />
      <Blog cid={company.id} pending={company.invited} blogs={blogs} onUpdate={getTheContent} />
    </>
  );
}

export default CompanyPage;
