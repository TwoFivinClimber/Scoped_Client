import React, { useState } from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import GearModal from './GearModal';
import { useAuth } from '../utils/context/authContext';

function Gear({
  authId, jobId, gearArr, onUpdate,
}) {
  const [abri, setAbri] = useState(false);
  const { user } = useAuth();
  return (
    <>
      <Segment className="job-equipment-segment">
        <Header as="h3">Gear
          <Button hidden={authId !== user.id} onClick={() => setAbri(!abri)} size="small">Add Gear</Button>
        </Header>
        <div className="job-equipment-div">
          {gearArr?.map((i) => (
            <li key={i.id} className="job-equipment-item">{i.gear.label}</li>
          ))}
        </div>
      </Segment>
      <GearModal gearArr={gearArr} abri={abri} setAbri={setAbri} jobId={jobId} onUpdate={onUpdate} />
    </>
  );
}

Gear.propTypes = {
  gearArr: PropTypes.arrayOf(
    PropTypes.shape({
      gear: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  ),
  jobId: PropTypes.number,
  authId: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
};

Gear.defaultProps = {
  authId: null,
  jobId: null,
  gearArr: [],
};

export default Gear;
