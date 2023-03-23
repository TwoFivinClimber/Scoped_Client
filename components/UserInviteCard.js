import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function UserInviteCard({ user, setSelected }) {
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={user.image}
        />
        <Card.Header>{user.label || user.name}</Card.Header>
        <Card.Meta>{user.email}</Card.Meta>
        <Card.Meta>{user.phone}</Card.Meta>
        <Card.Description>
          {user.bio}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {!user.name ? (
          <div className="ui two buttons">
            <Button inverted type="submit" color="green">
              Invite
            </Button>
            <Button onClick={() => setSelected({})} inverted color="red">
              Cancel
            </Button>
          </div>
        ) : (
          <h1>Pending</h1>
        )}
      </Card.Content>
    </Card>
  );
}

UserInviteCard.propTypes = {
  setSelected: PropTypes.func.isRequired,
  user: PropTypes.shape({
    value: PropTypes.number,
    name: PropTypes.string,
    label: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    image: PropTypes.string,
    creation: PropTypes.string,
  }).isRequired,
};

export default UserInviteCard;
