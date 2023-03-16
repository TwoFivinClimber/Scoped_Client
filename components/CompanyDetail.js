import React from 'react';
import {
  Header, Grid, Image, Divider, Segment, List, Dropdown,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function CompanyDetail({ obj }) {
  const { user } = useAuth();
  return (
    <>
      <Segment>
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h1">{obj?.name}</Header>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Dropdown
              className="link item"
              icon="ellipsis horizontal"
              hidden={obj.owner?.id !== user.id}
            >
              <Dropdown.Menu>
                <Link passHref href="/">
                  <Dropdown.Item>Admin</Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid>
        <Grid columns={3} divided>
          <Grid.Column as="h5">
            <li>{obj.type}</li>
            <Divider />
            <li>{obj.location}</li>
            <Divider />
            <li>Scoped Since: {obj.creation}</li>
            <Divider />
            <li>Owner: {obj.owner?.name}</li>
            <Divider />
            <li>707-621-1665</li>
            <Divider />
            <li>{obj.owner?.email}</li>
          </Grid.Column>
          <Grid.Column>
            <Image centered size="medium" src={obj.logo} />
          </Grid.Column>
          <Grid.Column className="job-crew-column">
            <Header as="h4">Employees
            </Header>
            <List horizontal relaxed>
              {obj.employees?.map((i) => (
                <List.Item key={i.id}>
                  <Image avatar src={i.user.image} />
                  <List.Content>
                    <List.Header>{i.user.name}</List.Header>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid>
        <Header as="h3">About</Header>
        <p>{obj.description}</p>
      </Segment>
    </>
  );
}

CompanyDetail.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    owner: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    name: PropTypes.string,
    image: PropTypes.string,
    logo: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    creation: PropTypes.string,
    employees: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        user: PropTypes.shape({
          name: PropTypes.string,
          image: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
};

export default CompanyDetail;
