import { React } from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { acceptJob, declineJob } from '../utils/data/invites';
import { useInvite } from '../utils/context/navContext';
import { useAuth } from '../utils/context/authContext';

function Invite({ obj, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();
  const { updateInvites } = useInvite();
  const date = obj.job.datetime.split('T')[0];
  const time = obj.job.datetime.split('T')[1].split('Z')[0];

  const acceptOffer = () => {
    if (window.confirm(`Job is on ${date} at ${time}.  PLease arrive 15min prior to start time`)) {
      acceptJob(obj.id);
      updateInvites(user.id);
      onUpdate();
    }
  };

  const declineOffer = () => {
    if (window.confirm('Decline Offer ?')) {
      declineJob(obj.id).then(() => {
        updateInvites(user.id);
        onUpdate();
      });
    }
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{obj.job.title}
          <Button inverted color="red" onClick={() => declineOffer()} floated="right">Decline</Button>
          <Button inverted color="green" onClick={() => acceptOffer()} floated="right">Accept</Button>
          <Button inverted color="purple" onClick={() => router.push(`/job/${obj.job.id}`)} floated="right">View</Button>
        </Card.Header>
        <Card.Meta className="meta-fix">
          <span className="date">{date}, {time}</span>
          <span className="location">{obj.job.location}</span>
        </Card.Meta>
        <Card.Description>
          {obj.job.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {obj.skill.skill}
      </Card.Content>
    </Card>
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
  onUpdate: PropTypes.func.isRequired,
};

export default Invite;
