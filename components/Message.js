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
    updateMessage(message).then(onUpdate);
  };

  return (
    <Comment.Group>
      <Comment>
        <Comment.Avatar src={obj.uid?.image} />
        <Comment.Content>
          <Comment.Author>{obj.uid?.name}</Comment.Author>
          <Comment.Metadata>
            <div>{obj?.datetime.split('T')[0]} {obj?.datetime.split('T')[1]}</div>
          </Comment.Metadata>
          {!edit ? (
            <Comment.Text>{obj?.content}</Comment.Text>
          ) : <Form.TextArea onChange={handleChange} value={editMessage} />}
          <Comment.Actions>
            {edit ? (<Comment.Action onClick={handleSubmit}>Submit</Comment.Action>) : ('')}
            {obj.uid.id === user.id ? (
              <> <Comment.Action onClick={editThisComment}>Edit</Comment.Action><Comment.Action onClick={deleteThisMessage}>Delete</Comment.Action></>
            ) : <Comment.Action>Reply</Comment.Action>}
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </Comment.Group>
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
