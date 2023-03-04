import React, { useState } from 'react';
import {
  Segment, Header, Image, Button, Item,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ImageModal from './ImageModal';
import ImageForm from './ImageForm';
import { deleteImage } from '../utils/data/image';

function Images({ imageArr, jobId, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [abri, setAbri] = useState(false);
  const [editImage, setEdit] = useState({});

  const deleteThisImage = (id) => {
    if (window.confirm('Delete this Job Image?')) {
      deleteImage(id).then(() => onUpdate());
    }
  };

  const handleEdit = (index) => {
    setEdit(imageArr[index]);
    setAbri(!abri);
  };

  return (
    <>
      <Segment className="job-image-segment">
        <Header as="h3">Photos
          <Button onClick={() => setAbri(!abri)}>Add Photos</Button>
        </Header>
        <div className="job-images-div">
          {imageArr?.map((i) => (
            <Item key={i.id}>
              <Image onClick={() => setOpen(!open)} key={i.id} size="small" bordered centered rounded className="job-image" src={i.image} />
              <Item.Extra onClick={() => deleteThisImage(i.id)} as="button">
                Delete
              </Item.Extra>
              <Item.Extra onClick={() => handleEdit(imageArr.indexOf(i))} as="button">
                Edit
              </Item.Extra>
            </Item>
          ))}
        </div>
      </Segment>
      <ImageModal open={open} setOpen={setOpen} images={imageArr} />
      <ImageForm abri={abri} setAbri={setAbri} jobId={jobId} onUpdate={onUpdate} editImage={editImage} setEdit={setEdit} />
    </>
  );
}

Images.propTypes = {
  jobId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
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
