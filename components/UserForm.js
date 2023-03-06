import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Header, Image, Button, Checkbox, Form,
} from 'semantic-ui-react';
import AsyncSelect from 'react-select/async';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth';
import { getSkills } from '../utils/data/skills';
import { useAuth } from '../utils/context/authContext';
import { updateUserProfile } from '../utils/data/user';

function UserForm({ userObj }) {
  const initialState = {
    firebase: userObj.uid,
    name: userObj.fbUser.displayName,
    image: userObj.fbUser.photoURL,
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

  // registerUser(input)
  // updateUser(userObj.uid)
  const handleSubmit = (e) => {
    e.preventDefault();
    if ('valid' in userObj) {
      input.skills = input.skills.map((s) => s.value);
      registerUser(input).then(() => updateUser(userObj.uid));
    } else {
      input.skills = input.skills.map((s) => s.value);
      input.id = userObj.id;
      updateUserProfile(input).then(() => updateUser(userObj.uid)).then(() => router.push(`/user/${userObj.id}`));
    }
  };

  useEffect(() => {
    if (userObj.id) {
      const fSkills = userObj?.skills.map((i) => ({ value: i.skill.id, label: i.skill.skill }));
      const userData = {
        firebase: userObj.uid,
        name: userObj.name,
        image: userObj.image,
        bio: userObj.bio,
        skills: fSkills,
      };
      setInput(userData);
    }
  }, [userObj]);

  return (
    <Form onSubmit={handleSubmit}>
      <Header as="h1">
        <Image circular src={input.image} /> {userObj.fbUser.displayName}
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
  userObj: PropTypes.shape({
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
