import React from 'react';
import {
  Header, Grid, Image, Divider, Segment, List,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

function JobDetail({ obj }) {
  const date = obj.datetime?.split('T')[0];
  const time = obj.datetime?.split('T')[1].split('Z')[0];

  return (
    <>
      <Segment fluid>
        <Header as="h1">{obj?.title}</Header>
        <Grid columns={2} divided>
          <Grid.Column as="h5">
            <li>{obj.location}</li>
            <Divider />
            <li>{date}</li>
            <Divider />
            <li>{time}</li>
          </Grid.Column>
          <Grid.Column className="job-crew-column">
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
      </Segment>
      <Segment>
        <Header as="h3">Job Details</Header>
        <p>{obj.description}</p>
      </Segment>
      <Segment className="job-equipment-segment">
        <Header as="h3">Equipment</Header>
        <div className="job-equipment-div">
          {obj.gear?.map((i) => (
            <li className="job-equipment-item">{i.gear.name}</li>
          ))}
        </div>
      </Segment>
    </>
  );
}

JobDetail.propTypes = {
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
