import React from 'react';
import { Card, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

function JobCard({ obj }) {
  const router = useRouter();
  // const date = obj.datetime?.split('T')[0];
  // const time = obj.datetime?.split('T')[1].split('Z')[0];
  return (
    <Card fluid as="button" onClick={() => router.push(`/job/${obj.id}`)}>
      <Card.Content style={{ width: '100% ' }}>
        <Image src={obj.company.logo} avatar size="huge" floated="right" />
        <Header floated="left" as="h2" content={obj.title} />
        <Card.Description as="h5" textAlign="left">{obj.datetime}</Card.Description>
      </Card.Content>
      <Card.Content description={obj.description} />
      <Card.Content extra>
        <Card.Content content={obj.category.skill} />
      </Card.Content>
    </Card>
  );
}

JobCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    datetime: PropTypes.string,
    location: PropTypes.string,
    category: PropTypes.shape({
      skill: PropTypes.string,
    }),
    company: PropTypes.shape({
      logo: PropTypes.string,
    }),
  }).isRequired,
};

export default JobCard;
