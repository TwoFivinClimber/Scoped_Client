import React, { useState } from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import GearModal from './GearModal';
import { useAuth } from '../utils/context/authContext';

function Gear({
  authId, jobId, arr, onUpdate,
}) {
  const [abri, setAbri] = useState(false);
  const { user } = useAuth();
  return (
    <>
      <Segment className="job-equipment-segment">
        <Header as="h3">Gear
          <Button hidden={!authId === user.id} onClick={() => setAbri(!abri)} size="small">Add Gear</Button>
        </Header>
        <div className="job-equipment-div">
          {arr?.map((i) => (
            <li className="job-equipment-item">{i.gear.label}</li>
          ))}
        </div>
      </Segment>
      <GearModal gearArr={arr} abri={abri} setAbri={setAbri} jobId={jobId} onUpdate={onUpdate} />
    </>
  );
}

Gear.propTypes = {
  arr: PropTypes.arrayOf(
    PropTypes.shape({
      gear: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  ).isRequired,
  jobId: PropTypes.number.isRequired,
  authId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Gear;
