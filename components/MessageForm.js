import React, { useState, useEffect } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createMessage } from '../utils/data/messages';

function MessageForm({ obj, jobId, onUpdate }) {
  const [input, setInput] = useState('');
  const { user } = useAuth();

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
    console.warn(input.length > 0);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (obj.id) {
      setInput(obj.content);
    }
  }, [obj]);

  return (
    <Form onSubmit={handleSubmit} reply>
      <Header as="h6">Add a Message</Header>
      <Form.TextArea value={input} onChange={handleChange} onKeyDown={handleKeyDown} />
      <Button hidden={input === ''} type="submit" content="Add Reply" />
    </Form>
  );
}

MessageForm.propTypes = {
  jobId: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
  }).isRequired,
};

MessageForm.defaultProps = {
  jobId: null,
};

export default MessageForm;
