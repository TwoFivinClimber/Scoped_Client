import React, { useState } from 'react';
import {
  Header, Grid, Image, Divider, Segment, List, Button, Dropdown,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import CrewModal from './CrewModal';
import { useAuth } from '../utils/context/authContext';

function JobDetail({ obj, onUpdate }) {
  const date = obj.datetime?.split('T')[0];
  const time = obj.datetime?.split('T')[1].split('Z')[0];
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const deleteThisJob = () => {
    console.warn(obj);
  };

  return (
    <>
      <Segment fluid>
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h1">{obj?.title}</Header>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Dropdown
              className="link item"
              icon="ellipsis horizontal"
              hidden={!obj.uid?.id === user.id}
            >
              <Dropdown.Menu>
                <Link passHref href={`/job/edit/${obj.id}`}>
                  <Dropdown.Item>Edit</Dropdown.Item>
                </Link>

                <Dropdown.Item onClick={deleteThisJob}>Delete</Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid>
        <Grid columns={2} divided>
          <Grid.Column as="h5">
            <li>{obj.location}</li>
            <Divider />
            <li>{date}</li>
            <Divider />
            <li>{time}</li>
          </Grid.Column>
          <Grid.Column className="job-crew-column">
            <Header as="h4">Crew
              <Button hidden={!obj.uid === user.id} onClick={() => setOpen(!open)} size="small">Add Crew</Button>
            </Header>
            <List horizontal relaxed>
              {obj.crew?.map((i) => (
                <List.Item key={i.id}>
                  <Image avatar src={i.uid.image} />
                  <List.Content>
                    <List.Header>{i.uid.name}</List.Header>
                    {i.skill.skill}
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid>
        <Header as="h3">Job Details</Header>
        <p>{obj.description}</p>
      </Segment>
      <CrewModal jobId={obj.id} crew={obj.crew} open={open} setOpen={setOpen} onUpdate={onUpdate} />
    </>
  );
}

JobDetail.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    datetime: PropTypes.string,
    address: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
    category: PropTypes.shape({
      id: PropTypes.number,
      skill: PropTypes.string,
    }),
    uid: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    crew: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        accepted: PropTypes.bool,
        skill: PropTypes.shape({
          skill: PropTypes.string,
        }),
        uid: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          image: PropTypes.string,
        }),
      }),
    ),
    gear: PropTypes.arrayOf(
      PropTypes.shape({
        gear: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    ),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default JobDetail;
