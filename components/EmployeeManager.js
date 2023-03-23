import React from 'react';
import {
  Modal, Segment, Item, Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import EmployeeDetail from './EmployeeDetail';

function EmployeeManager({
  employees, cid, abri, setAbri, onUpdate, companySkills, ownerId,
}) {
  return (
    <Modal
      className="crew-modal"
      onClose={() => setAbri(false)}
      onOpen={() => setAbri(true)}
      open={abri}
    >
      <Modal.Header>Employees</Modal.Header>
      <Segment>
        <Item.Group relaxed>
          {employees?.map((i) => (
            <EmployeeDetail key={i.id} employee={i} cid={cid} ownerId={ownerId} onUpdate={onUpdate} companySkills={companySkills} />
          ))}
        </Item.Group>
      </Segment>
      <Modal.Actions>
        <Button onClick={() => setAbri(!abri)} color="black">Done</Button>
      </Modal.Actions>
    </Modal>
  );
}

EmployeeManager.propTypes = {
  abri: PropTypes.bool.isRequired,
  setAbri: PropTypes.func.isRequired,
  cid: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  companySkills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      skill: PropTypes.string,
    }),
  ).isRequired,
  employees: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
};

export default EmployeeManager;
