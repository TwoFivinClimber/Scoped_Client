import React from 'react';
import {
  Modal, Button, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

function ImageModal({ open, setOpen, images }) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>Image Detail</Modal.Header>

      {images?.map((i) => (
        <Modal.Content image>
          <Image className="modal-images" src={i.image} wrapped />
          <Modal.Description>
            <p>{i.description}</p>
          </Modal.Description>
        </Modal.Content>
      ))}
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} color="red" inverted>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

ImageModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
};

export default ImageModal;
