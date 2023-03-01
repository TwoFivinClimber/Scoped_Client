import React, { useState } from 'react';
import {
  Modal, Button, Form, Segment, List, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { getCrewForJob } from '../utils/data/user';

const prevState = {
  uid: 0,
  skill: 0,
};
function CrewModal({
  jobId, open, setOpen, crew,
}) {
  const [selected, setSelected] = useState(prevState);

  const selectedSkills = selected.skills?.map((i) => ({
    value: i.skill.id,
    label: i.skill.skill,
  }));

  const handleCrewSelect = (selection) => {
    setSelected(selection);
  };

  const handleSkillSelect = (selection) => {
    setSelected((prev) => ({
      ...prev,
      skill: selection,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    console.warn(selected);
  };

  const getAvailableCrew = () => new Promise((resolve) => {
    getCrewForJob(jobId).then((response) => {
      resolve(response);
    });
  });

  return (
    <Modal
      className="crew-modal"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Select Job Crew</Modal.Header>
      <Segment>
        <Form onSubmit={handleAdd}>
          <Form.Field>
            <label htmlFor="userSelect">Select a Member</label>
            <AsyncSelect
              id="userSelect"
              cacheOptions
              defaultOptions
              value={selected.uid}
              onChange={handleCrewSelect}
              loadOptions={getAvailableCrew}
            />
          </Form.Field>
          <Form.Field fluid>
            <label htmlFor="skillSelect">Select Job Skill</label>
            <Select
              id="skillSelect"
              cacheOptions
              defaultOptions
              value={selected.skill}
              onChange={handleSkillSelect}
              options={selectedSkills}
            />
          </Form.Field>
          <Form.Group className="crew-modal-buttons" widths="equal">
            <Button type="submit" positive>
              Add
            </Button>
            <Button type="button" color="black" onClick={() => setOpen(false)}>
              Done
            </Button>
          </Form.Group>
        </Form>
        <List horizontal relaxed>
          {crew?.map((i) => (
            <List.Item key={i.id}>
              <Image avatar src={i.uid.image} />
              <List.Content>
                <List.Header>{i.uid.name}</List.Header>
                {i.skill.skill}
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    </Modal>
  );
}

CrewModal.propTypes = {
  jobId: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  crew: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      accepted: PropTypes.bool,
      skill: PropTypes.shape({
        skill: PropTypes.string,
      }),
      uid: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        image: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default CrewModal;
