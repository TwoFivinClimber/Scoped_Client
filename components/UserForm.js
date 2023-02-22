import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AsyncSelect from 'react-select/async';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth';
import getSkills from '../utils/data/skills';
import { useAuth } from '../utils/context/authContext';

function UserForm({ user }) {
  const initialState = {
    firebase: user.uid,
    name: user.fbUser.displayName,
    image: user.fbUser.photoURL,
    bio: '',
    skills: [],
  };
  const [input, setInput] = useState(initialState);
  const router = useRouter();
  const { updateUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(user);
  };
  const handleSkills = (selected) => {
    setInput((prevState) => ({
      ...prevState,
      skills: selected,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ('valid' in user) {
      input.skills = input.skills.map((s) => s.value);
      registerUser(input).then(() => updateUser(user.uid)).then(() => router.push('/'));
    } else {
      updateUser();
    }
  };

  useEffect(() => {
    if (user.id) {
      const fSkills = user?.skills.map((i) => ({ value: i.skill.id, label: i.skill.skill }));
      const userObj = {
        firebase: user.uid,
        name: user.name,
        image: user.image,
        bio: user.bio,
        skills: fSkills,
      };
      console.warn(userObj);
      setInput(userObj);
    }
  }, [user]);

  return (
    <Form onSubmit={handleSubmit}>
      <Card style={{ display: 'flex', 'flex-direction': 'row', 'align-items': 'center' }}>
        <Image value={input.image} src={user.fbUser.photoURL} style={{ height: '80px', width: '80px', 'border-radius': '50%' }} />
        <Card.Title>{user.fbUser.displayName}</Card.Title>
      </Card>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Bio</Form.Label>
        <Form.Control name="bio" value={input.bio} required placeholder="Enter your Tag Line" onChange={handleChange} />
        <Form.Label>Skills</Form.Label>
        <AsyncSelect
          isMulti
          cacheOptions
          defaultOptions
          value={input.skills}
          onChange={handleSkills}
          loadOptions={getSkills}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        skill: PropTypes.shape({
          id: PropTypes.number,
          skill: PropTypes.string,
        }),
      }),
    ),
    fbUser: PropTypes.shape({
      displayName: PropTypes.string,
      photoURL: PropTypes.string,
    }),
  }).isRequired,
};

export default UserForm;
