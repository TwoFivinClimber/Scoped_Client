import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Item, List, Form, Button,
} from 'semantic-ui-react';
import Select from 'react-select';
import { createUserSkills } from '../utils/data/skills';

function EmployeeDetail({
  employee, companySkills, cid, onUpdate,
}) {
  const [edit, setEdit] = useState(false);
  const [skills, setSkills] = useState([]);

  const handleSelect = (e) => {
    setSkills(e);
  };
  const handleSubmit = () => {
    const payload = {
      uid: employee.id,
      cid,
      skills: skills.map((i) => i.id),
    };
    createUserSkills(payload).then(() => {
      onUpdate();
      setEdit(!edit);
    });
  };

  const handleCancel = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    if (employee.skills) {
      const empSkills = employee.skills.map((i) => ({
        id: i.skill.id,
        skill: i.skill.skill,
      }));
      setSkills(empSkills);
    }
  }, [employee]);

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
              <Select
                id="userSelect"
                isMulti
                cacheOptions
                defaultOptions
                onChange={handleSelect}
                getOptionLabel={(skill) => skill.skill}
                getOptionValue={(skill) => skill.id}
                value={skills}
                options={companySkills}
              />
            </Form.Field>
            <Button type="submit" inverted color="green">Submit</Button>
            <Button type="button" inverted color="red" onClick={() => handleCancel()}>Cancel</Button>
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
  onUpdate: PropTypes.func.isRequired,
  cid: PropTypes.number.isRequired,
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
  companySkills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      skill: PropTypes.string,
    }),
  ).isRequired,
};

export default EmployeeDetail;
