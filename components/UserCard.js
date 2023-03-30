import React from 'react';
import {
  Image, Grid, Header, List, Dropdown,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { deleteUser } from '../utils/data/user';
import { signOut } from '../utils/auth';

function UserCard({ obj }) {
  const { user } = useAuth();
  const router = useRouter();

  const deleteAccount = () => {
    if (window.confirm('Delete Your Account ?')) {
      if (window.confirm('Are you sure ?')) {
        deleteUser(obj.id).then(() => {
          signOut();
          router.push('/');
        });
      }
    }
  };
  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={4}>
          <Image className="profile-image" fluid rounded src={obj.image} />
        </Grid.Column>
        <Grid.Column textAlign="center" width={11}>
          <div>
            <Header as="h1">{obj.name}</Header>
            <Header as="h6">{obj.email} | {obj.phone}</Header>
            <Dropdown
              className="link item"
              icon="ellipsis horizontal"
              hidden={!obj.id === user.id}
            >
              <Dropdown.Menu>
                <Link passHref href="/user/edit">
                  <Dropdown.Item>Edit</Dropdown.Item>
                </Link>

                <Dropdown.Item onClick={deleteAccount}>Delete</Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Header as="h4">{obj.bio}</Header>
          <List horizontal size="large" bulleted>
            {obj.skills?.map((i) => (
              <List.Item key={i.skill.skill}>{i.skill.skill}</List.Item>
            ))}
          </List>
        </Grid.Column>
        {/* Grid FOr right side goes here */}
      </Grid.Row>
    </Grid>
  );
}

UserCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
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
