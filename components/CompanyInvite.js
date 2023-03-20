import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

function CompanyInvite({ obj }) {
  const router = useRouter();

  const acceptOffer = () => {
    if (window.confirm('Good to Go')) {
      console.warn('yes');
    }
  };

  const declineOffer = () => {
    if (window.confirm('Decline Offer ?')) {
      console.warn('no');
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
  id: PropTypes.number.isRequired,
  obj: PropTypes.shape({
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
