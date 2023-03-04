import React, { useState } from 'react';
import {
  Segment, Header, Image, Form, Item, Grid,
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
      <Item.Group className="job-form-image-item-div">
        {images?.map((i) => (
          <Item className="job-form-image-item">
            <Image className="job-form-image" src={URL.createObjectURL(i)} />
            <Item.Content header verticalAlign="middle">Description of this photo goes here</Item.Content>
          </Item>
        ))}
      </Item.Group>
      <ImageModal open={open} setOpen={setOpen} images={imageArr} />
      <Segment className="job-image-segment">
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h3">Photos</Header>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Input type="file" multiple onChange={handleImage} />
            </Form>
          </Grid.Column>
        </Grid>
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
  ),
};

Images.defaultProps = {
  imageArr: [],
};

export default Images;
