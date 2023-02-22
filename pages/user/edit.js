import React from 'react';
import UserForm from '../../components/UserForm';
import { useAuth } from '../../utils/context/authContext';

function EditUser() {
  const { user } = useAuth();

  return (
    <UserForm user={user} />
  );
}

export default EditUser;
