/* eslint-disable react/jsx-boolean-value */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import CompanyDetail from '../../../components/CompanyDetail';
import GearManager from '../../../components/GearManager';
import SkillManager from '../../../components/SkillManager';
import { getCompany } from '../../../utils/data/company';
import { getEmployees } from '../../../utils/data/employee';

function Admin() {
  const [company, setCompany] = useState({});
  const [employees, setEmployees] = useState([]);
  const router = useRouter();
  const { cid } = router.query;

  const getTheContent = () => {
    getCompany(cid).then(setCompany);
    getEmployees(cid).then(setEmployees);
  };

  useEffect(() => {
    getTheContent();
  }, [router]);

  return (
    <>
      <CompanyDetail admin={true} obj={company} employees={employees} onUpdate={getTheContent} />
      <GearManager companyGear={company.gear} cid={company.id} onUpdate={getTheContent} />
      <SkillManager companySkills={company.skills} cid={company.id} onUpdate={getTheContent} />
    </>
  );
}

export default Admin;
