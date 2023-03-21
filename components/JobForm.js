/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import {
  Form, Button, Image, Header,
} from 'semantic-ui-react';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { findPlace, getLocationDetails } from '../utils/data/location';
import { getSkills } from '../utils/data/skills';
import { createJob, updateJob } from '../utils/data/job';

const initialState = {
  cid: null,
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  address: '',
  lat: null,
  long: null,
  category: null,
};

function JobForm({ obj }) {
  const [input, setInput] = useState(initialState);
  const [company, setCompany] = useState({});
  const [key, setKey] = useState(1234);
  const router = useRouter();
  const { user } = useAuth();
  const companies = user.companies?.filter((i) => i.admin === true);

  const refreshTypeOptions = () => {
    setKey(Math.floor(Math.random() * 10));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.warn(input);
  };

  const handleCategory = (selected) => {
    setInput((prev) => ({
      ...prev,
      category: selected,
    }));
  };

  const handleCompanySelect = (e) => {
    setCompany(e);
    setInput((prev) => ({
      ...prev,
      cid: e.company.id,
    }));
    refreshTypeOptions();
  };

  const handleLocationSelect = (target) => {
    if (target) {
      getLocationDetails(target.value).then((response) => {
        setInput((prev) => ({
          ...prev,
          location: response.name,
          address: response.formatted_address,
          lat: response.geometry.location.lat,
          long: response.geometry.location.lng,
        }));
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      input.datetime = `${input.date} ${input.time}`;
      input.category = input.category.value;
      updateJob(input).then(() => {
        router.push(`/job/${obj.id}`);
      });
    } else {
      const payload = { ...input, uid: user.id };
      payload.datetime = `${input.date} ${input.time}:00`;
      payload.category = payload.category.value;
      createJob(payload).then((jobObj) => {
        router.push(`/job/${jobObj.id}`);
      });
    }
  };

  const getCompanySkills = () => new Promise((resolve, reject) => {
    getSkills(company.company?.id).then(resolve)
      .catch(reject);
  });

  useEffect(() => {
    if (obj.id) {
      setInput({
        ...obj,
        time: obj.datetime?.split('T')[1].split('Z')[0],
        date: obj.datetime?.split('T')[0],
        category: { value: obj.category.id, label: obj.category.skill },
        company: { company: obj.company },
      });
    }
  }, [obj]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Header>Create Job</Header>
        <Form.Group className="job-form-company" widths="equal">
          <Form.Field>
            <label htmlFor="company">Company</label>
            <Select
              id="company"
              backspaceRemovesValue
              isClearable
              onChange={handleCompanySelect}
              value={input?.company}
              getOptionLabel={(i) => i.company.name}
              getOptionValue={(i) => i.company.id}
              options={companies}
              isDisabled={obj.id}
              required
            />
          </Form.Field>
          <Form.Field centered>
            <Image centered size="small" src={company.company?.logo || ''} />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input name="title" value={input.title} onChange={handleChange} fluid label="Title" placeholder="Job Title" required />
          <Form.Field>
            <label htmlFor="location">Location</label>
            <AsyncSelect
              id="location"
              backspaceRemovesValue
              isClearable
              value={{ label: input.location, value: input.location }}
              onChange={handleLocationSelect}
              loadOptions={findPlace}
              placeholder="Check it Out"
              required
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input name="date" value={input.date} type="date" onChange={handleChange} fluid label="Date" placeholder="Job Date" required />
          <Form.Input name="time" value={input.time} type="time" onChange={handleChange} fluid label="Time" placeholder="Job Time" required />
          <Form.Field>
            <label htmlFor="catSelect">Job Type</label>
            <AsyncSelect
              id="catSelect"
              key={key}
              cacheOptions
              defaultOptions
              noOptionsMessage={() => 'Please Add Company Skills'}
              value={input.category}
              onChange={handleCategory}
              loadOptions={getCompanySkills}
            />
          </Form.Field>
        </Form.Group>
        <Form.TextArea name="description" value={input.description} onChange={handleChange} label="Description" placeholder="Please Provide Job Details..." />
        <Form.Group className="job-form-buttons" widths="equal">
          <div>
            <Button type="submit" positive>Submit</Button>
          </div>
          <div>
            <Button onClick={() => router.push('/')} type="button" negative>Cancel</Button>
          </div>
        </Form.Group>
      </Form>
    </>
  );
}

JobForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    datetime: PropTypes.string,
    location: PropTypes.string,
    address: PropTypes.string,
    company: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    lat: PropTypes.number,
    long: PropTypes.number,
    category: PropTypes.shape({
      id: PropTypes.number,
      skill: PropTypes.string,
    }),
  }).isRequired,
};

export default JobForm;
