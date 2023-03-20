import React, { useState } from 'react';
import {
  Segment, Header, Button, Form, List, Container, Confirm,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { createSkill, deleteSkill } from '../utils/data/skills';

function SkillManager({ companySkills, cid, onUpdate }) {
  const [input, setInput] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [chopBlock, setChopBlock] = useState({});

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const gearObj = {
      skill: input,
      cid,
    };
    createSkill(gearObj).then(() => {
      onUpdate();
      setInput('');
    });
  };
  const checkDelete = (i) => {
    setChopBlock(i);
    setConfirm(!confirm);
  };

  const handleDelete = (id) => {
    deleteSkill(id).then(() => {
      onUpdate();
      setConfirm(!confirm);
    });
  };

  return (
    <>
      <Segment className="job-equipment-segment">
        <Header as="h3">Company Gear
          <Container>
            <Form onSubmit={handleSubmit} className="admin-gear-form">
              <Form.Field>
                <Form.Input label="Add Gear" value={input} onChange={handleChange} placeholder="Enter Item Name" />
                <Button type="submit">Submit</Button>
              </Form.Field>
            </Form>
          </Container>
        </Header>
        <List divided verticalAlign="center">
          {companySkills?.map((i) => (
            <List.Item key={i.id}>
              <List.Content as="h6" verticalAlign="middle">
                {i.skill}
                <Button onClick={() => checkDelete(i)} size="small" floated="right" inverted color="red">Delete</Button>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <Confirm
          className="crew-modal"
          open={confirm}
          cancelButton="Never mind"
          content={`Delete ${chopBlock.skill} ?`}
          confirmButton="Delete"
          onCancel={() => setConfirm(!confirm)}
          onConfirm={() => handleDelete(chopBlock.id)}
        />
      </Segment>
    </>
  );
}

SkillManager.propTypes = {
  cid: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  companySkills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      skill: PropTypes.string,
    }),
  ).isRequired,
};

export default SkillManager;
