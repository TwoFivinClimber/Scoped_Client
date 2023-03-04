import React, { useState } from 'react';
import {
  Modal, Button, Form, Segment, List, Image, Header, Comment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import {
  getCrewForJob, createCrew, updateCrew, deleteCrew,
} from '../utils/data/user';
import { getUserSkills } from '../utils/data/skills';

function CrewModal({
  jobId, open, setOpen, crew, onUpdate,
}) {
  const [selected, setSelected] = useState({});
  const [selectedSkills, setSelectedSkills] = useState({});

  const closeModal = () => {
    setSelected({});
    setOpen(!open);
  };

  const setEdit = (user) => {
    getUserSkills(user.id).then((skills) => {
      const member = { value: user.uid.id, label: user.uid.name };
      setSelected({
        id: user.id,
        value: user.uid.id,
        label: user.uid.name,
        skill: { value: user.skill.id, label: user.skill.skill },
        member,
      });
      setSelectedSkills(skills.map((i) => ({
        value: i.value,
        label: i.label,
      })));
    });
  };

  const getAvailableCrew = () => new Promise((resolve) => {
    getCrewForJob(jobId).then((response) => {
      resolve(response);
    });
  });

  const handleCrewSelect = (selection) => {
    console.warn(selection);
    setSelected({
      // skills: selection.skills,
      member: { value: selection.value, label: selection.label },
      uid: selection.value,
    });
    setSelectedSkills(selection.skills.map((i) => ({
      value: i.skill.value,
      label: i.skill.label,
    })));
  };

  const handleSkillSelect = (selection) => {
    setSelected((prev) => ({
      ...prev,
      skill: selection,
    }));
  };

  /// {uid, job, skill}///
  const handleAdd = (e) => {
    e.preventDefault();
    if (selected.id) {
      const crewObj = {
        id: selected.id,
        skill: selected.skill.value,
      };
      updateCrew(crewObj).then(() => {
        onUpdate();
      });
    } else {
      const crewObj = {
        uid: selected.uid,
        job: jobId,
        skill: selected.skill.value,
      };
      createCrew(crewObj).then(() => {
        onUpdate();
      });
    }
    setSelected({});
  };

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to remove ${user.uid.name} from this job ?`)) {
      deleteCrew(user.id).then(() => {
        onUpdate();
      });
    }
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
        <Form onSubmit={handleAdd}>
          <Form.Field>
            <label htmlFor="userSelect">Select a Member</label>
            <AsyncSelect
              id="userSelect"
              defaultOptions
              cacheOptions={false}
              value={selected.member || ''}
              onChange={handleCrewSelect}
              loadOptions={getAvailableCrew}
              required
            />
          </Form.Field>
          <Form.Field fluid>
            <label htmlFor="skillSelect">Select Job Skill</label>
            <Select
              id="skillSelect"
              defaultOptions
              cacheOptions={false}
              value={selected.skill || ''}
              onChange={handleSkillSelect}
              options={selectedSkills}
              required
            />
          </Form.Field>
          <Form.Group className="crew-modal-buttons" widths="equal">
            <Button type="submit" positive>
              Add
            </Button>
            <Button type="button" color="black" onClick={() => closeModal()}>
              Done
            </Button>
          </Form.Group>
        </Form>
        <List horizontal relaxed>
          <Header as="h4">Invited Crew</Header>
          {crew?.map((i) => (
            <List.Item key={i.id}>
              <Image avatar src={i.uid.image} />
              <List.Content>
                <List.Header>{i.uid.name}</List.Header>
                {i.skill.skill}
                <Comment.Actions>
                  <Comment.Action onClick={() => setEdit(i)}>Edit</Comment.Action>
                  <span>-</span>
                  <Comment.Action onClick={() => handleDelete(i)}>Remove</Comment.Action>
                </Comment.Actions>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    </Modal>
  );
}

CrewModal.propTypes = {
  jobId: PropTypes.number,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
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
  ),
};

CrewModal.defaultProps = {
  jobId: null,
  crew: [],
};

export default CrewModal;
