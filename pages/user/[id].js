import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import UserCard from '../../components/UserCard';
import { getUser } from '../../utils/data/user';

function UserPage() {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getUser(id).then(setUser);
  }, [id, router, user]);

  return (
    <UserCard obj={user} />
  );
}

export default UserPage;
