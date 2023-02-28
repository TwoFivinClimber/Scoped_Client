import React, { useState } from 'react';
import { Comment, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { deleteMessage, updateMessage } from '../utils/data/messages';

function Message({ obj, onUpdate }) {
  const { user } = useAuth();
  const [edit, setEdit] = useState(false);
  const [editMessage, setEditMessage] = useState('');

  const deleteThisMessage = () => {
    if (window.confirm('You Sure?')) {
      deleteMessage(obj.id).then(onUpdate);
    }
  };

  const editThisComment = () => {
    setEdit(!edit);
    setEditMessage(obj.content);
  };

  const handleChange = (e) => {
    setEditMessage(e.target.value);
  };

  const handleSubmit = () => {
    const message = {
      id: obj.id,
      content: editMessage,
    };
    updateMessage(message).then(() => {
      onUpdate();
      setEdit(!edit);
    });
  };

  return (
    <Comment>
      <Comment.Avatar src={obj.uid?.image} />
      <Comment.Content>
        <Comment.Author>{obj.uid?.name}</Comment.Author>
        <Comment.Metadata>
          <div>{obj?.datetime.split('T')[0]} {obj?.datetime.split('T')[1]}</div>
        </Comment.Metadata>
        <Comment.Text hidden={edit}>{obj?.content}</Comment.Text>
        <Form.Input hidden={!edit} fluid onChange={handleChange} value={editMessage} />
        <Comment.Actions>
          <Comment.Action hidden={!edit} onClick={handleSubmit}>Submit</Comment.Action>
          <Comment.Action hidden={!edit} onClick={() => setEdit(!edit)}>Cancel</Comment.Action>
          <Comment.Action hidden={!obj.uid.id === user.id || edit} onClick={editThisComment}>Edit</Comment.Action>
          <Comment.Action hidden={!obj.uid.id === user.id || edit} onClick={deleteThisMessage}>Delete</Comment.Action>
          <Comment.Action hidden={obj.uid.id === user.id}>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      {/* Reply goes here */}
    </Comment>
  );
}

Message.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    datetime: PropTypes.string,
    uid: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Message;
