import React from 'react';
import {
  Image, Grid, Header, List,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

function UserCard({ obj }) {
  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={4}>
          <Image src={obj.image} />
        </Grid.Column>
        <Grid.Column textAlign="center" width={12}>
          <Header as="h1">{obj.name}</Header>
          <Header as="h4">{obj.bio}</Header>
          <List horizontal size="large" bulleted>
            {obj.skills?.map((i) => (
              <List.Item>{i.skill.skill}</List.Item>
            ))}
          </List>
        </Grid.Column>
      </Grid.Row>
    </Grid>
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
