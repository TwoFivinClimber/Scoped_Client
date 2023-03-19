import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Item, List, Form, Button,
} from 'semantic-ui-react';
import AsyncSelect from 'react-select';

function EmployeeDetail({ employee }) {
  const [edit, setEdit] = useState(false);

  const handleSubmit = () => {
    console.warn('Submit');
  };
  return (
    <Item>
      <Item.Image size="small" src={employee.user?.image} />
      <Item.Content>
        <Item.Header as="a">{employee.user.name}</Item.Header>
        <Item.Meta>Skills</Item.Meta>
        <Item.Description>
          <List hidden={edit} bulleted horizontal>
            {employee.skills?.map((skill) => (
              <List.Item key={skill.skill.id}>{skill.skill?.skill}</List.Item>
            ))}
          </List>
          <Form hidden={!edit} onSubmit={handleSubmit}>
            <Form.Field>
              <label htmlFor="userSelect">Edit Skills</label>
              <AsyncSelect
                id="userSelect"
                isMulti
                cacheOptions
                defaultOptions
              />
            </Form.Field>
          </Form>
        </Item.Description>
        <Item.Extra>Since: {employee.creation}</Item.Extra>
      </Item.Content>
      <Item.Group hidden={edit}>
        <Button positive onClick={() => setEdit(!edit)}>Edit</Button>
        <Button negative>Delete</Button>
      </Item.Group>
    </Item>
  );
}

EmployeeDetail.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number,
    creation: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      image: PropTypes.string,
    }),
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        skill: PropTypes.shape({
          id: PropTypes.number,
          skill: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
};

export default EmployeeDetail;
