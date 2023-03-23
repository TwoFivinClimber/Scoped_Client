import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { acceptCompanyInvite, declineCompanyInvite } from '../utils/data/invites';
import { useInvite } from '../utils/context/navContext';
import { useAuth } from '../utils/context/authContext';

function CompanyInvite({ obj }) {
  const router = useRouter();
  const { updateInvites } = useInvite();
  const { user, updateUser } = useAuth();

  const acceptOffer = () => {
    if (window.confirm('Good to Go')) {
      acceptCompanyInvite(obj.id).then(() => {
        updateInvites();
        updateUser(user.firebase);
        router.push('/');
      });
    }
  };

  const declineOffer = () => {
    if (window.confirm('Decline Offer ?')) {
      declineCompanyInvite(obj.id).then(() => {
        updateInvites();
        router.push('/');
      });
    }
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{obj.company?.name}
          <Button inverted color="red" onClick={() => declineOffer()} floated="right">Decline</Button>
          <Button inverted color="green" onClick={() => acceptOffer()} floated="right">Accept</Button>
          <Button inverted color="purple" onClick={() => router.push(`/company/${obj.company?.id}`)} floated="right">View</Button>
        </Card.Header>
        <Card.Meta className="meta-fix">
          <span className="date">{obj.company?.type}</span>
          <span className="location">{obj.company?.location}</span>
        </Card.Meta>
        <Card.Description>
          {obj.company?.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {obj.company.owner?.name}
      </Card.Content>
    </Card>
  );
}

CompanyInvite.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.shape,
    company: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      logo: PropTypes.string,
      type: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.string,
      creation: PropTypes.string,
      owner: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default CompanyInvite;
