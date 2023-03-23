import { React, useState } from 'react';
import { Card, Button, Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { acceptJob, declineJob } from '../utils/data/invites';
import { useInvite } from '../utils/context/navContext';

function Invite({ obj }) {
  const router = useRouter();
  const { updateInvites } = useInvite();
  const [decline, setDecline] = useState(false);
  const [accept, setAccept] = useState(false);
  const date = obj.job.datetime.split('-')[0];
  const time = obj.job.datetime.split('-')[1];

  const acceptOffer = () => {
    acceptJob(obj.id).then(() => {
      updateInvites();
    });
  };

  const declineOffer = () => {
    declineJob(obj.id).then(() => {
      updateInvites();
    });
  };

  return (
    <>
      <Card fluid>
        <Card.Content>
          <Card.Header>{obj.job.title}
            <Button inverted color="red" onClick={() => setDecline(!decline)} floated="right">Decline</Button>
            <Button inverted color="green" onClick={() => setAccept(!accept)} floated="right">Accept</Button>
            <Button inverted color="purple" onClick={() => router.push(`/job/${obj.job.id}`)} floated="right">View</Button>
          </Card.Header>
          <Card.Meta className="meta-fix">
            <span className="date">{date}, {time}</span>
            <span className="location"> at {obj.job.location}</span>
          </Card.Meta>
          <Card.Description>
            {obj.job.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {obj.skill.skill}
        </Card.Content>
      </Card>
      <Confirm
        className="crew-modal"
        open={accept}
        cancelButton="Never Mind"
        content={`Job is on ${date} at ${time}.  Please arrive 15min prior to start time`}
        confirmButton="Accept"
        onCancel={() => setAccept(!accept)}
        onConfirm={() => acceptOffer()}
      />
      <Confirm
        className="crew-modal"
        open={decline}
        cancelButton="Never Mind"
        content="Decline Job Offer ?"
        confirmButton="Delete"
        onCancel={() => setDecline(!decline)}
        onConfirm={() => declineOffer()}
      />
    </>
  );
}

Invite.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    job: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      datetime: PropTypes.string,
      location: PropTypes.string,
    }),
    skill: PropTypes.shape({
      skill: PropTypes.string,
    }),
  }).isRequired,
};

export default Invite;
