import React from 'react';
import {
  Modal, Button, Form, Segment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { getCrewForJob } from '../utils/data/user';

function CrewModal({ open, setOpen }) {
  const handleSelect = (e) => {
    console.warn(e);
  };

  return (
    <Modal
      className="crew-modal"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Select Job Crew</Modal.Header>
      <Segment>
        <Form>
          <Form.Field>
            <label htmlFor="userSelect">Select a Member</label>
            <AsyncSelect
              id="userSelect"
              isMulti
              cacheOptions
              defaultOptions
              onChange={handleSelect}
              loadOptions={getCrewForJob}
            />
          </Form.Field>
          <Form.Field fluid>
            <label htmlFor="skillSelect">Select Job Skill</label>
            <AsyncSelect
              id="userSelect"
              isMulti
              cacheOptions
              defaultOptions
              onChange={handleSelect}
              loadOptions={getCrewForJob}
            />
          </Form.Field>
          <Form.Group className="crew-modal-buttons" widths="equal">
            <Button positive>
              Add
            </Button>
            <Button color="black" onClick={() => setOpen(false)}>
              Done
            </Button>
          </Form.Group>
        </Form>
      </Segment>
    </Modal>
  );
}

CrewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default CrewModal;
