import React, { useState } from 'react';
import {
  Segment, Header, List, Image, Icon, Button, Dropdown, Confirm,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BlogModal from './BlogModal';
import { deleteBlogPost } from '../utils/data/blog';

function Blog({
  blogs, cid, onUpdate, pending,
}) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [edit, setEdit] = useState({});

  const handleEdit = (post) => {
    setEdit(post);
    setOpen(!open);
  };

  const deletePost = (id) => {
    deleteBlogPost(id).then(() => {
      onUpdate();
      setConfirm(!confirm);
    });
  };

  return (
    <>
      <Segment>
        <Header as="h2">Message Board
          <Button floated="right" hidden={pending} basic color="black" onClick={() => setOpen(!open)}>
            <Icon color="orange" name="add" />
            Add A Post
          </Button>
        </Header>
        {blogs?.map((i) => (
          <Segment key={i.id} color="yellow">
            <div className="blog-title-header">
              <Header as="h3">{i.title}
                <Dropdown
                  icon="ellipsis horizontal"
                  size="tiny"
                >
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEdit(i)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => setConfirm(!confirm)}>Delete</Dropdown.Item>
                    <Confirm
                      className="crew-modal"
                      open={confirm}
                      cancelButton="Never mind"
                      confirmButton="Delete It"
                      onCancel={() => setConfirm(!confirm)}
                      onConfirm={() => deletePost(i.id)}
                    />
                  </Dropdown.Menu>
                </Dropdown>
                <Header.Subheader>{i.datetime}</Header.Subheader>
              </Header>
              <List.Item className="blog-user-tag">
                <Image avatar src={i.uid?.image} />
                <List.Content>
                  <List.Header>{i.uid?.name}</List.Header>
                </List.Content>
              </List.Item>
            </div>
            <p>{i.content}</p>
          </Segment>
        ))}
      </Segment>
      <BlogModal setOpen={setOpen} setEdit={setEdit} cid={cid} open={open} obj={edit} onUpdate={onUpdate} />
    </>
  );
}

Blog.propTypes = {
  cid: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        image: PropTypes.string,
      }),
      title: PropTypes.string,
      content: PropTypes.string,
      datetime: PropTypes.string,
    }),
  ).isRequired,
};

export default Blog;
