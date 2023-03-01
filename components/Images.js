import React, { useState } from 'react';
import {
  Segment, Header, Image, Form, Item,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ImageModal from './ImageModal';

function Images({ imageArr }) {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);

  const handleImage = (e) => {
    setImages((prev) => [
      ...prev,
      ...e.target.files,
    ]);
  };

  return (
    <>
      <Form>
        <Form.Input type="file" multiple onChange={handleImage} fluid label="Images" placeholder="Upload Images" />
        <Item.Group className="job-form-image-item-div">
          {images?.map((i) => (
            <Item className="job-form-image-item">
              <Image className="job-form-image" src={URL.createObjectURL(i)} />
              <Item.Content header verticalAlign="middle">Description of this photo goes here</Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Form><ImageModal open={open} setOpen={setOpen} images={imageArr} />
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
