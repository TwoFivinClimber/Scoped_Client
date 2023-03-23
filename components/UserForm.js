import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Header, Image, Button, Checkbox, Form,
} from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { updateUserProfile } from '../utils/data/user';

function UserForm({ userObj }) {
  const initialState = {
    firebase: userObj.uid,
    name: userObj.fbUser.displayName,
    phone: '',
    email: userObj.fbUser.email,
    image: userObj.fbUser.photoURL,
    bio: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if ('valid' in userObj) {
      registerUser(input).then(() => updateUser(userObj.uid).then(() => {
        router.push('/profile');
      }));
    } else {
      input.id = userObj.id;
      updateUserProfile(input).then(() => updateUser(userObj.firebase)).then(() => router.push('/profile'));
    }
  };

  useEffect(() => {
    if (userObj.id) {
      const fSkills = userObj?.skills.map((i) => ({ value: i.skill.id, label: i.skill.skill }));
      const userData = {
        firebase: userObj.uid,
        name: userObj.name,
        image: userObj.image,
        phone: userObj.phone,
        email: userObj.email,
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
      <Form.Field type="tel">
        <label>Phone Number
          <input name="phone" value={input.phone} onChange={handleChange} placeholder="Enter Your Contact number" />
        </label>
      </Form.Field>
      <Form.Field type="email">
        <label>Email
          <input name="email" value={input.email} onChange={handleChange} placeholder="Enter Your Contact number" />
        </label>
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
    firebase: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
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
      email: PropTypes.string,
    }),
  }).isRequired,
};

export default UserForm;
