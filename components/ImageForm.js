import React, { useState, useEffect } from 'react';
import {
  Modal, Button, Form, Segment, Item, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { createJobImages, updateImage } from '../utils/data/image';

function ImageForm({
  abri, setAbri, jobId, onUpdate, editImage, setEdit,
}) {
  const [images, setImages] = useState([]);

  const handleClose = () => {
    setImages([]);
    setEdit({});
    setAbri(!abri);
  };

  const handleImage = (e) => {
    const fileArr = [...e.target.files];
    const formatted = fileArr.map((file) => ({
      image: file,
      description: '',
      job: jobId,
    }));
    setImages((prev) => [
      ...prev,
      ...formatted,
    ]);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (editImage.id) {
      updateImage(images[0]).then(() => {
        onUpdate();
        handleClose();
      });
    } else {
      createJobImages(images).then(() => {
        onUpdate();
        handleClose();
      });
    }
  };

  const handleDescription = (e) => {
    const { name, value } = e.target;
    setImages((prev) => {
      const prevCopy = [...prev];
      prevCopy[name].description = value;
      return prevCopy;
    });
  };

  useEffect(() => {
    if (editImage.id) {
      setImages((prev) => ([
        ...prev,
        editImage,
      ]));
    }
  }, [editImage]);

  return (
    <Modal
      className="crew-modal"
      onClose={() => setAbri(false)}
      onOpen={() => setAbri(true)}
      open={abri}
    >
      <Modal.Header>Add Your Images</Modal.Header>
      <Segment>
        <Form onSubmit={handleAdd}>
          <Form.Input hidden={editImage.id} type="file" multiple onChange={handleImage} />
          <Item.Group className="job-form-image-item-div">
            {images?.map((i) => (
              <Item key={i.image.lastMoidified} className="job-form-image-item">
                <Image className="job-form-image" src={editImage.id ? i.image : URL.createObjectURL(i.image)} />
                <Form.TextArea label="Add Description" value={editImage.id ? images[0].description : images[images.indexOf[i]]?.description} name={images.indexOf(i)} onChange={handleDescription} />
              </Item>
            ))}
          </Item.Group>
          <Form.Group className="crew-modal-buttons" widths="equal">
            <Button type="submit" positive>
              Add
            </Button>
            <Button type="button" color="black" onClick={handleClose}>
              Done
            </Button>
          </Form.Group>
        </Form>
      </Segment>
    </Modal>
  );
}

ImageForm.propTypes = {
  abri: PropTypes.bool.isRequired,
  setAbri: PropTypes.func.isRequired,
  jobId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  editImage: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
  }),
};

ImageForm.defaultProps = {
  editImage: {},
};

export default ImageForm;
