import React, { useState, useEffect } from 'react';
import {
  Modal, Button, Form, Segment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { getGear, updateJobGear } from '../utils/data/gear';

function GearModal({
  gearArr, abri, setAbri, jobId, onUpdate,
}) {
  const [gear, setGear] = useState([]);

  const handleSelect = (e) => {
    setGear(e);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (jobId) {
      const gearObj = {
        jobId,
        gear: gear.map((i) => i.value),
      };
      updateJobGear(gearObj).then(() => {
        onUpdate();
        setAbri(!abri);
      });
    }
  };

  useEffect(() => {
    if (gearArr?.length) {
      const gearValue = gearArr.map((i) => i.gear);
      setGear(gearValue);
    }
  }, [abri, gearArr]);

  return (
    <Modal
      className="crew-modal"
      onClose={() => setAbri(false)}
      onOpen={() => setAbri(true)}
      open={abri}
    >
      <Modal.Header>Select Job Gear Needed</Modal.Header>
      <Segment>
        <Form onSubmit={handleAdd}>
          <Form.Field>
            <label htmlFor="userSelect">Select Gear</label>
            <AsyncSelect
              id="userSelect"
              isMulti
              cacheOptions
              defaultOptions
              value={gear}
              onChange={handleSelect}
              loadOptions={getGear}
            />
          </Form.Field>
          <Form.Group className="crew-modal-buttons" widths="equal">
            <Button type="submit" positive>
              Add
            </Button>
            <Button type="button" color="black" onClick={() => setAbri(false)}>
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
  jobId: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
  gearArr: PropTypes.arrayOf(
    PropTypes.shape({
      gear: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number,
      }),
    }),
  ),
};

GearModal.defaultProps = {

  jobId: null,
  gearArr: [],
};

export default GearModal;
