import React, { useState } from 'react';
import {
  Segment, Form, Header, Grid, Image,
} from 'semantic-ui-react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import UserInviteCard from './UserInviteCard';
import { createInvite } from '../utils/data/invites';

function InviteManager({
  available, logo, cid, onUpdate, name,
}) {
  const [selected, setSelected] = useState({});

  const handleSelect = (e) => {
    setSelected(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invite = {
      uid: selected.value,
      cid,
    };
    createInvite(invite).then(() => {
      onUpdate();
      setSelected({});
    });
  };

  return (
    <Segment>
      <Header as="h2">Invite Users</Header>
      <Grid columns={2}>
        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <Header as="h4"> Invite Users To Company</Header>
            <label htmlFor="inviteSelect">Find Users</label>
            <Select
              id="inviteSelect"
              defaultOptions
              onChange={handleSelect}
              options={available}
              value={selected}
            />
            {selected.value ? <UserInviteCard user={selected} setSelected={setSelected} /> : ''}
          </Form>
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Header as="h3">{name}</Header>
          <Image centered size="medium" src={logo} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

InviteManager.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cid: PropTypes.number.isRequired,
  available: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    }),
  ).isRequired,
};

export default InviteManager;
