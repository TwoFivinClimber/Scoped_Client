import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Header, Image, Button, Checkbox, Form,
} from 'semantic-ui-react';
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
  const [terms, setTerms] = useState(false);
  const router = useRouter();
  const { updateUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      setInput(userObj);
    }
  }, [user]);

  return (
    <Form onSubmit={handleSubmit}>
      <Header as="h1">
        <Image circular src={input.image} /> {user.fbUser.displayName}
      </Header>
      <Form.Field>
        <label>Bio
          <input name="bio" value={input.bio} onChange={handleChange} placeholder="Tell us about yourself" />
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="skillSelect">Skills</label>
        <AsyncSelect
          id="skillSelect"
          isMulti
          cacheOptions
          defaultOptions
          value={input.skills}
          onChange={handleSkills}
          loadOptions={getSkills}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox required value={terms} onClick={() => setTerms(!terms)} label="I agree to the Terms and Conditions" />
      </Form.Field>
      <Button positive type="submit">Submit</Button>
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

//   <Form.Group className="mb-3" controlId="formBasicEmail">
//     <Form.Label>Bio</Form.Label>
//     <Form.Control name="bio" value={input.bio} required placeholder="Enter your Tag Line" onChange={handleChange} />
//     <Form.Label>Skills</Form.Label>
//     <AsyncSelect
//       isMulti
//       cacheOptions
//       defaultOptions
//       value={input.skills}
//       onChange={handleSkills}
//       loadOptions={getSkills}
//     />
//   </Form.Group>
//   <Button variant="primary" type="submit">
//     Submit
//   </Button>
// </Form>
