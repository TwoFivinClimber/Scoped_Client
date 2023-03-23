import React, { useState, useEffect } from 'react';
import {
  Modal, Button, Form, Segment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createBlogPost, updateBlogPost } from '../utils/data/blog';

const initialState = {
  title: '',
  content: '',
};

function BlogModal({
  obj, cid, open, setOpen, setEdit, onUpdate,
}) {
  const [input, setInput] = useState(initialState);
  const { user } = useAuth();

  const closeFunction = () => {
    setEdit({});
    setInput(initialState);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const post = {
      ...input,
      cid,
      uid: user.id,
    };
    if (post.id) {
      updateBlogPost(post).then(() => {
        onUpdate();
        closeFunction();
      });
    } else {
      createBlogPost(post).then(() => {
        onUpdate();
        closeFunction();
      });
    }
  };

  useEffect(() => {
    if (obj.id) {
      setInput(obj);
    }
  }, [obj]);

  return (
    <Modal
      onClose={() => closeFunction()}
      open={open}
      className="crew-modal"
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Segment>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Title
              <input name="title" value={input.title} onChange={handleChange} placeholder="Title Your post" />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="post"> Content</label>
            <Form.TextArea id="post" name="content" value={input.content} onChange={handleChange} placeholder="What do you want to say ?" />
          </Form.Field>
          <Form.Group className="crew-modal-buttons" widths="equal">
            <Button type="submit" positive>
              Add
            </Button>
            <Button type="button" color="black" onClick={() => closeFunction()}>
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </Segment>
    </Modal>
  );
}

BlogModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  cid: PropTypes.number.isRequired,
  setEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.shape({
      id: PropTypes.number,
    }),
    content: PropTypes.string,
  }).isRequired,
};

export default BlogModal;
