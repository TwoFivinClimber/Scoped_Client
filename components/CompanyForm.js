import React, { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { findCity, getLocationDetails } from '../utils/data/location';
import { createCompany, updateCompany } from '../utils/data/company';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  id: null,
  name: '',
  logo: '',
  type: '',
  location: '',
  lat: null,
  long: null,
  email: '',
  phone: '',
  description: '',
};
function CompanyForm({ obj }) {
  const [input, setInput] = useState(initialState);
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationSelect = (target) => {
    if (target) {
      getLocationDetails(target.value).then((response) => {
        const location = response.formatted_address;
        const string = `${location.split(',')[0]},${location.split(',')[1]}`;
        setInput((prev) => ({
          ...prev,
          location: string,
          lat: response.geometry.location.lat,
          long: response.geometry.location.lng,
        }));
      });
    }
  };

  const handleSubmit = () => {
    if (obj.id) {
      updateCompany(input).then(() => {
        router.push(`/company/${obj.id}`);
      });
    } else {
      const cmpObj = {
        ...input,
        uid: user.id,
      };
      createCompany(cmpObj).then((response) => {
        updateUser(user.firebase).then(() => {
          router.push(`/company/${response.id}`);
        });
      });
    }
  };

  useEffect(() => {
    if (obj.id) {
      setInput({
        id: obj.id,
        name: obj.name,
        type: obj.type,
        location: obj.location,
        lat: obj.lat,
        long: obj.long,
        email: obj.email,
        phone: obj.phone,
        description: obj.description,
      });
    }
  }, [obj]);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input fluid name="name" value={input.name} onChange={handleChange} label="Company Name" required />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input fluid name="type" value={input.type} onChange={handleChange} label="Company Type" required />
        <Form.Field>
          <label htmlFor="location">Location</label>
          <AsyncSelect
            required
            id="location"
            backspaceRemovesValue
            isClearable
            value={{ label: input.location, value: input.location }}
            onChange={handleLocationSelect}
            loadOptions={findCity}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input name="email" type="email" value={input.email} onChange={handleChange} label="Email" required />
        <Form.Input name="phone" type="tel" maxLength={10} minLength={10} value={input.phone} onChange={handleChange} label="Phone Number" required />
      </Form.Group>
      <Form.TextArea name="description" value={input.description} onChange={handleChange} label="Company Description" required />
      <Form.Group className="job-form-buttons">
        <Button type="submit" content="Submit" positive />
        <Button content="Cancel" negative />
      </Form.Group>
    </Form>
  );
}

CompanyForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    location: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
    email: PropTypes.string,
    phone: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default CompanyForm;
