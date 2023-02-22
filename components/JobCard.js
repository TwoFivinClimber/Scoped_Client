import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function JobCard({ obj }) {
  return (
    <Card>
      <Card.Content header={obj.title} />
      <Card.Content content={obj.datetime.split('T')[0]} />
      <Card.Content description={obj.description} />
      <Card.Content extra>
        <Card.Content content={obj.category.skill} />
      </Card.Content>
    </Card>
  );
}

JobCard.propTypes = {
  obj: PropTypes.shape({
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
