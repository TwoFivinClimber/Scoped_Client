import React, { useEffect, useState } from 'react';
import { Button, Form, Image } from 'semantic-ui-react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { findCity, getLocationDetails } from '../utils/data/location';
import { useAuth } from '../utils/context/authContext';
import { createCompanyImage } from '../utils/data/utils';
import { createCompany } from '../utils/data/company';

function CompanyForm({ obj }) {
  const [input, setInput] = useState({});
  const [logo, setLogo] = useState();
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.warn(input);
  };

  const handleLocationSelect = (target) => {
    if (target) {
      getLocationDetails(target.value).then((response) => {
        const location = response.formatted_address;
        const string = `${location.split(',')[0]},${location.split(',')[1]}`;
        console.warn(response, string);
        setInput((prev) => ({
          ...prev,
          location: string,
          lat: response.geometry.location.lat,
          long: response.geometry.location.lng,
        }));
      });
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };

  const handleSubmit = () => {
    if (obj.id) {
      console.warn('edit');
    } else {
      createCompanyImage(logo).then((resp) => {
        const cmpObj = {
          ...input,
          logo: resp,
          uid: user.id,
        };
        createCompany(cmpObj).then((response) => {
          router.push(`/company${response.id}`);
        });
      });
    }
  };

  useEffect(() => {
    if (obj.id) {
      setLogo(obj.logo);
      const cmp = obj;
      delete cmp.logo;
      setInput(cmp);
    }
  }, [obj]);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input fluid name="name" value={input.name} onChange={handleChange} label="Company Name" />
        <Form.Input type="file" label="Company Logo" onChange={handleImage} />
        {logo ? <Image avatar src={obj.id ? logo : URL.createObjectURL(logo)} /> : ''}
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input fluid name="type" value={input.type} onChange={handleChange} label="Company Type" />
        <Form.Field>
          <label htmlFor="location">Location</label>
          <AsyncSelect
            id="location"
            backspaceRemovesValue
            isClearable
            value={{ label: input.location, value: input.location }}
            onChange={handleLocationSelect}
            loadOptions={findCity}
            required
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input name="email" value={input.email} onChange={handleChange} label="Email" />
        <Form.Input name="phone" value={input.phone} onChange={handleChange} label="Phone Number" />
      </Form.Group>
      <Form.TextArea name="description" value={input.description} onChange={handleChange} label="Company Description" />
      <Form.Group className="job-form-buttons">
        <Button type="submit" content="Submit" positive />
        <Button content="Cancel" negative />
      </Form.Group>
    </Form>
  );
}

CompanyForm.propTypes = {
  obj: PropTypes.shape({
    logo: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default CompanyForm;
