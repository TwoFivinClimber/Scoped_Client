import React from 'react';
import { Modal, Segment, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import EmployeeDetail from './EmployeeDetail';

function EmployeeManager({
  employees, abri, setAbri, onUpdate,
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
            <EmployeeDetail employee={i} onupdate={onUpdate} />
          ))}
        </Item.Group>
      </Segment>
    </Modal>
  );
}

EmployeeManager.propTypes = {
  abri: PropTypes.bool.isRequired,
  setAbri: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
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
