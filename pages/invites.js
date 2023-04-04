import React from 'react';
import { Header } from 'semantic-ui-react';
import CompanyInvite from '../components/CompanyInvite';
import Invite from '../components/Invite';
import { useInvite } from '../utils/context/navContext';

function Invites() {
  const { invites, compInvites } = useInvite();

  return (
    <>
      <Header hidden={(invites?.length || compInvites?.length)} content="No Invites Right Now" />
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
