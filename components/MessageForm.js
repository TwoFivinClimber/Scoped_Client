import React, { useState, useEffect } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createMessage } from '../utils/data/messages';
import { useInvite } from '../utils/context/navContext';

function MessageForm({ jobId, onUpdate, authId }) {
  const [input, setInput] = useState('');
  const { user } = useAuth();
  const { invites } = useInvite();
  const jobInvite = invites?.find((i) => i.job?.id === jobId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      content: input,
      job: jobId,
      uid: user.id,
    };
    createMessage(message).then(onUpdate);
    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    console.warn(jobInvite?.accepted);
  }, [invites]);

  return (
    <Form onSubmit={handleSubmit} reply>
      <Header as="h6">Add a Message</Header>
      <Form.TextArea hidden={!(jobInvite?.accepted || authId === user.id)} value={input} onChange={handleChange} onKeyDown={handleKeyDown} />
      <Button hidden={input === ''} type="submit" content="Add Reply" />
    </Form>
  );
}

MessageForm.propTypes = {
  jobId: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
  authId: PropTypes.number.isRequired,
};

MessageForm.defaultProps = {
  jobId: null,
};

export default MessageForm;
