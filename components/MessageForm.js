import React, { useState, useEffect } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createMessage } from '../utils/data/messages';

function MessageForm({
  jobId, onUpdate, authId, crew,
}) {
  const [input, setInput] = useState('');
  const { user } = useAuth();

  const jobInvite = crew?.find((i) => i.uid.id === user.id);

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
    console.warn(crew);
  }, [crew]);

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
  crew: PropTypes.arrayOf(
    PropTypes.shape({
      accepted: PropTypes.bool,
      uid: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  ).isRequired,
};

MessageForm.defaultProps = {
  jobId: null,
};

export default MessageForm;
