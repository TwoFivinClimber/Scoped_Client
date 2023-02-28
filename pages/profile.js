import React from 'react';
import UserCard from '../components/UserCard';
import { useAuth } from '../utils/context/authContext';

function UserPage() {
  const { user } = useAuth();

  return (
    <UserCard obj={user} />
  );
}

export default UserPage;
