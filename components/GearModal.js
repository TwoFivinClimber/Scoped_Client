import React from 'react';
import {
  Modal, Button, Form, Segment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { getGear } from '../utils/data/gear';

function GearModal({ abri, setAbri }) {
  const handleSelect = (e) => {
    console.warn(e);
  };

  return (
    <Modal
      className="crew-modal"
      onClose={() => setAbri(false)}
      onOpen={() => setAbri(true)}
      open={abri}
    >
      <Modal.Header>Select Job Gear Needed</Modal.Header>
      <Segment>
        <Form>
          <Form.Field>
            <label htmlFor="userSelect">Select Gear</label>
            <AsyncSelect
              id="userSelect"
              isMulti
              cacheOptions
              defaultOptions
              onChange={handleSelect}
              loadOptions={getGear}
            />
          </Form.Field>
          <Form.Group className="crew-modal-buttons" widths="equal">
            <Button positive>
              Add
            </Button>
            <Button color="black" onClick={() => setAbri(false)}>
              Done
            </Button>
          </Form.Group>
        </Form>
      </Segment>
    </Modal>
  );
}

GearModal.propTypes = {
  abri: PropTypes.bool.isRequired,
  setAbri: PropTypes.func.isRequired,
};

export default GearModal;
