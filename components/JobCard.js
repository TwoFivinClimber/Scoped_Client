import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

function JobCard({ obj }) {
  const router = useRouter();
  const date = obj.datetime?.split('T')[0];
  const time = obj.datetime?.split('T')[1].split('Z')[0];
  return (
    <Card as="button" onClick={() => router.push(`/job/${obj.id}`)}>
      <Card.Content header={obj.title} />
      <Card.Content>{date} {time}</Card.Content>
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
  }).isRequired,
};

export default JobCard;
