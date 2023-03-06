import React from 'react';
import Invite from '../components/Invite';
import { useInvite } from '../utils/context/navContext';

function Invites() {
  const { invites } = useInvite();

  return (
    <>
      {invites?.map((invite) => (
        <Invite key={invite.id} obj={invite} />
      ))}
    </>
  );
}

export default Invites;
