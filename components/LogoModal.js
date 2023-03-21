/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  Modal, Segment, Form, Button, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { createCompanyImage } from '../utils/data/utils';
import { updateCompanyLogo } from '../utils/data/company';

function LogoModal({
  open, setOpen, logo, cid, onUpdate,
}) {
  const [image, setImage] = useState();
  const isObject = typeof image === 'object';

  const closeFunction = () => {
    setImage();
    setOpen(false);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = () => {
    createCompanyImage(image).then((url) => {
      const logoObj = {
        cid,
        logo: url,
      };
      updateCompanyLogo(logoObj).then(() => {
        onUpdate();
        closeFunction();
      });
    });
  };

  useEffect(() => {
    if (logo) {
      setImage(logo);
    }
  }, [logo, open]);

  return (
    <Modal
      onClose={() => closeFunction()}
      open={open}
      className="crew-modal"
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Segment>
        <Form onSubmit={handleSubmit}>
          <Image className="logo-modal-image" centered circular size="medium" src={isObject ? URL.createObjectURL(image) : image} />
          <Form.Input type="file" onChange={handleChange} label="Upload Your NewLogo" />
          <Form.Group className="crew-modal-buttons" widths="equal">
            <Button onClick={() => closeFunction()} type="button" positive>
              Save
            </Button>
            <Button type="button" color="black" onClick={() => closeFunction()}>
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </Segment>
    </Modal>
  );
}

LogoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  cid: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  logo: PropTypes.string,
};

LogoModal.defaultProps = {
  logo: '',
};

export default LogoModal;
