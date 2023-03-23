import React, { useState } from 'react';
import {
  Segment, Header, Image, Button, Item,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ImageModal from './ImageModal';
import ImageForm from './ImageForm';
import { deleteImage } from '../utils/data/image';
import { useAuth } from '../utils/context/authContext';

function Images({
  imageArr, jobId, onUpdate, authId,
}) {
  const [open, setOpen] = useState(false);
  const [abri, setAbri] = useState(false);
  const [editImage, setEdit] = useState({});
  const { user } = useAuth();

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
          <Button as="dropdown" floated="right" size="small" hidden={authId !== user.id} onClick={() => setAbri(!abri)}>Add Photos</Button>
        </Header>
        <div className="job-images-div">
          {imageArr?.map((i) => (
            <Item key={i.id}>
              <Image onClick={() => setOpen(!open)} key={i.id} size="small" bordered centered rounded className="job-image" src={i.image} />
              <Item.Extra>
                <Button.Group size="mini" compact>
                  <Button size="mini" inverted color="green" content="Edit" hidden={authId !== user.id} onClick={() => handleEdit(imageArr.indexOf(i))} />
                  <Button.Or text="or" />
                  <Button size="mini" inverted color="red" content="Delete" hidden={authId !== user.id} onClick={() => deleteThisImage(i.id)} />
                </Button.Group>
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
  authId: PropTypes.number.isRequired,
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
