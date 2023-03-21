/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Header, Grid, Image, Divider, Segment, List, Button, Dropdown,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CrewModal from './CrewModal';
import { useAuth } from '../utils/context/authContext';
import { deleteJob } from '../utils/data/job';

function JobDetail({ job, onUpdate }) {
  const date = job.datetime?.split('T')[0];
  const time = job.datetime?.split('T')[1].split('Z')[0];
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const deleteThisJob = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(job.id).then(() => router.push('/'));
    }
  };

  return (
    <>
      <Segment>
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h1">{job?.title}</Header>
            <Header>{job.company?.name}</Header>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Dropdown
              className="link item"
              icon="ellipsis horizontal"
              hidden={job.uid?.id !== user.id}
            >
              <Dropdown.Menu>
                <Link passHref href={`/job/edit/${job.id}`}>
                  <Dropdown.Item>Edit</Dropdown.Item>
                </Link>
                <Dropdown.Item onClick={deleteThisJob}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid>
        <Grid columns={2} divided>
          <Grid.Column as="h5">
            <li>{job.location}</li>
            <Divider />
            <li>{date}</li>
            <Divider />
            <li>{time}</li>
          </Grid.Column>
          <Grid.Column className="job-crew-column">
            <Header as="h4">Crew
              <Button hidden={job.uid?.id !== user.id} onClick={() => setOpen(!open)} size="small">Add Crew</Button>
            </Header>
            <List horizontal relaxed>
              {job.crew?.map((i) => (
                <List.Item key={i.id}>
                  <Image avatar src={i.uid.image} />
                  <List.Content>
                    <List.Header>{i.uid.name}</List.Header>
                    {i.skill.skill}{`-${i.accepted ? 'Accepted' : i.accepted === false ? 'Declined' : 'Pending'}`}
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid>
        <Header as="h3">Job Details</Header>
        <p>{job.description}</p>
      </Segment>
      <CrewModal jobId={job.id} cid={job.company?.id} crew={job.crew} open={open} setOpen={setOpen} onUpdate={onUpdate} />
    </>
  );
}

JobDetail.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  job: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    datetime: PropTypes.string,
    address: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
    company: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
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
