import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Segment, Header, Grid } from 'semantic-ui-react';
import InviteManager from '../../../../components/InviteManager';
import { getAvailableUsers } from '../../../../utils/data/user';
import { getCompany } from '../../../../utils/data/company';
import UserInviteCard from '../../../../components/UserInviteCard';
import { useAuth } from '../../../../utils/context/authContext';

function Invites() {
  const router = useRouter();
  const { cid } = router.query;
  const [available, setAvailable] = useState([]);
  const [company, setCompany] = useState({});
  const { user } = useAuth();

  const getTheContent = () => {
    getAvailableUsers(cid).then(setAvailable);
    getCompany(cid, user.id).then(setCompany);
  };

  useEffect(() => {
    getTheContent();
  }, [cid]);
  return (
    <>
      <InviteManager available={available} cid={company.id} onUpdate={getTheContent} name={company.name} logo={company.logo} />
      <Segment hidden={!company.invites?.length}>
        <Header as="h2">Active Invites</Header>
        <Grid columns={3}>
          {company.invites?.map((i) => (
            <Grid.Column>
              <UserInviteCard user={i.uid} />
            </Grid.Column>
          ))}
        </Grid>
      </Segment>
    </>
  );
}

export default Invites;
