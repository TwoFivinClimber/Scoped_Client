import React, { useState } from 'react';
import {
  Segment, Header, Button, Form, List, Container, Confirm,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { createGear, deleteGear } from '../utils/data/gear';

function GearManager({ companyGear, cid, onUpdate }) {
  const [input, setInput] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [chopBlock, setChopBlock] = useState({});

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const gearObj = {
      name: input,
      cid,
    };
    createGear(gearObj).then(() => {
      onUpdate();
      setInput('');
    });
  };
  const checkDelete = (i) => {
    setChopBlock(i);
    setConfirm(!confirm);
  };

  const handleDelete = (id) => {
    deleteGear(id).then(() => {
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
                <Button type="submit">Add</Button>
              </Form.Field>
            </Form>
          </Container>
        </Header>
        <List divided verticalAlign="center">
          {companyGear?.map((i) => (
            <List.Item key={i.id}>
              <List.Content as="h6" verticalAlign="middle">
                {i.name}
                <Button onClick={() => checkDelete(i)} size="small" floated="right" inverted color="red">Delete</Button>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <Confirm
          className="crew-modal"
          open={confirm}
          cancelButton="Never mind"
          content={`Delete ${chopBlock.name} ?`}
          confirmButton="Delete"
          onCancel={() => setConfirm(!confirm)}
          onConfirm={() => handleDelete(chopBlock.id)}
        />
      </Segment>
    </>
  );
}

GearManager.propTypes = {
  cid: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  companyGear: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default GearManager;
