import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function UserCard({ obj }) {
  return (
    <Card>
      <Image src={obj.image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{obj.name}</Card.Header>
        <Card.Description>
          {obj.bio}
        </Card.Description>
      </Card.Content>
      <Card.Meta>
        {obj.skills.map((skill) => (
          <li key={skill.id}>{skill.skill.skill}</li>
        ))}
      </Card.Meta>
    </Card>
  );
}

UserCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        skill: PropTypes.shape({
          skill: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
};

export default UserCard;
