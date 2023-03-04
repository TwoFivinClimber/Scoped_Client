/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import {
  Form, Button,
} from 'semantic-ui-react';
import AsyncSelect from 'react-select/async';
import AsyncCreatable from 'react-select/async-creatable';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { findPlace, getLocationDetails } from '../utils/data/location';
import { getSkills } from '../utils/data/skills';
import { createJob, updateJob } from '../utils/data/job';

const initialState = {
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
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategory = (selected) => {
    setInput((prev) => ({
      ...prev,
      category: selected,
    }));
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

  useEffect(() => {
    if (obj.id) {
      setInput({
        ...obj,
        time: obj.datetime?.split('T')[1].split('Z')[0],
        date: obj.datetime?.split('T')[0],
        category: { value: obj.category.id, label: obj.category.skill },
      });
    }
  }, [obj]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input name="title" value={input.title} onChange={handleChange} fluid label="Title" placeholder="Job Title" />
          <Form.Field>
            <label htmlFor="location">Location</label>
            <AsyncCreatable
              id="location"
              backspaceRemovesValue
              isClearable
              value={{ label: input.location, value: input.location }}
              onChange={handleLocationSelect}
              loadOptions={findPlace}
              required
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input name="date" value={input.date} type="date" onChange={handleChange} fluid label="Date" placeholder="Job Date" />
          <Form.Input name="time" value={input.time} type="time" onChange={handleChange} fluid label="Time" placeholder="Job Time" />
          <Form.Field>
            <label htmlFor="catSelect">Job Type</label>
            <AsyncSelect
              id="catSelect"
              cacheOptions
              defaultOptions
              value={input.category}
              onChange={handleCategory}
              loadOptions={getSkills}
            />
          </Form.Field>
        </Form.Group>
        <Form.TextArea name="description" value={input.description} onChange={handleChange} label="Description" placeholder="Please Provide Job Details..." />
        <Form.Group className="job-form-buttons" widths="equal">
          <div>
            <Button type="submit" positive>Submit</Button>
          </div>
          <div>
            <Button type="button" negative>Cancel</Button>
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
    lat: PropTypes.number,
    long: PropTypes.number,
    category: PropTypes.shape({
      id: PropTypes.number,
      skill: PropTypes.string,
    }),
  }).isRequired,
};

export default JobForm;
