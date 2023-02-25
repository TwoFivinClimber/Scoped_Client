import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createMessage } from '../utils/data/messages';

function MessageForm({ obj, job, onUpdate }) {
  const [input, setInput] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      content: input,
      job,
      uid: user.id,
    };
    createMessage(message).then(onUpdate);
    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (obj.id) {
      setInput(obj.content);
    }
  }, [obj]);

  return (
    <Form onSubmit={handleSubmit} reply>
      <Form.TextArea value={input} onChange={handleChange} />
      <Button type="submit" content="Add Reply" />
    </Form>
  );
}

MessageForm.propTypes = {
  job: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
  }).isRequired,
};

export default MessageForm;
