/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Invite from '../components/Invite';
import { useAuth } from '../utils/context/authContext';
import { useInvite } from '../utils/context/navContext';
import { getInvitesByUser } from '../utils/data/invites';

function Invites() {
  const { user } = useAuth();
  const [invites, setInvites] = useState([]);
  const { updateInvites } = useInvite();

  const getTheContent = () => {
    getInvitesByUser(user.id).then(setInvites);
  };

  useEffect(() => {
    getTheContent();
  }, [updateInvites]);

  return (
    <>
      {invites.map((invite) => (
        <Invite key={invite.id} obj={invite} onUpdate={getTheContent} />
      ))}
    </>
  );
}

export default Invites;
