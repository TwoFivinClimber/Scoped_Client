import React from 'react';
import CompanyInvite from '../components/CompanyInvite';
import Invite from '../components/Invite';
import { useInvite } from '../utils/context/navContext';

function Invites() {
  const { invites, compInvites } = useInvite();

  return (
    <>
      {invites?.map((invite) => (
        <Invite key={invite.id} obj={invite} />
      ))}
      {compInvites?.map((invite) => (
        <CompanyInvite obj={invite} />
      ))}
    </>
  );
}

export default Invites;
