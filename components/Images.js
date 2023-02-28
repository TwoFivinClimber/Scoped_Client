import React, { useState } from 'react';
import {
  Segment, Header, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ImageModal from './ImageModal';

function Images({ imageArr }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ImageModal open={open} setOpen={setOpen} images={imageArr} />
      <Segment className="job-image-segment">
        <Header as="h3">Photos</Header>
        <div className="job-images-div">
          {imageArr?.map((i) => (
            <Image onClick={() => setOpen(!open)} key={i.id} size="small" bordered centered rounded className="job-image" src={i.image} />
          ))}
        </div>
      </Segment>
    </>
  );
}

Images.propTypes = {
  imageArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
};

export default Images;
