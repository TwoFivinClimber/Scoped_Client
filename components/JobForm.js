/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import {
  Form, Button, Image, Header, Label,
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
  displayLocation: '',
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
  const { user, updateUser } = useAuth();
  const companies = user.companies?.filter((i) => i.admin === true);

  const [locationCheck, setLocationCheck] = useState(true);
  const [cmpCheck, setCmpCheck] = useState(true);
  const [typeCheck, setTypeCheck] = useState(true);

  const checkFunction = () => {
    if (!input.location) { setLocationCheck(false); }
    if (!input.cid) { setCmpCheck(false); }
    if (!input.category) { setTypeCheck(false); }
  };

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
    setTypeCheck(true);
  };

  const handleCompanySelect = (e) => {
    if (e !== null) {
      setCompany(e);
      setInput((prev) => ({
        ...prev,
        cid: e.company.id,
      }));
      refreshTypeOptions();
      setCmpCheck(true);
    } else {
      setCompany({});
      setInput((prev) => ({
        ...prev,
        cid: null,
      }));
    }
  };

  const handleLocationSelect = (target) => {
    if (target !== null) {
      getLocationDetails(target.value).then((response) => {
        console.warn(response);
        setInput((prev) => ({
          ...prev,
          location: response.name,
          displayLocation: `${response.name}, ${response.formatted_address.split(',')[1]}`,
          address: response.formatted_address,
          lat: response.geometry.location.lat,
          long: response.geometry.location.lng,
        }));
        setLocationCheck(true);
      });
    } else {
      setInput((prev) => ({
        ...prev,
        location: '',
        displayLocation: '',
        address: '',
        lat: null,
        long: null,
      }));
    }
  };

  const handleSubmit = (e) => {
    if (input.cid && input.location && input.category) {
      e.preventDefault();
      if (obj.id) {
        input.datetime = `${input.date} ${input.time}`;
        input.category = input.category.value;
        updateJob(input).then(() => {
          updateUser(user.firebase);
          router.push(`/job/${obj.id}`);
        });
      } else {
        const payload = { ...input, uid: user.id };
        payload.datetime = `${input.date} ${input.time}:00`;
        payload.category = payload.category.value;
        createJob(payload).then((jobObj) => {
          updateUser(user.firebase);
          router.push(`/job/${jobObj.id}`);
        });
      }
    } else {
      checkFunction();
    }
  };

  const getCompanySkills = () => new Promise((resolve, reject) => {
    if (company.company) {
      getSkills(company.company?.id).then(resolve)
        .catch(reject);
    }
  });

  useEffect(() => {
    if (obj.id) {
      setInput({
        ...obj,
        time: `${obj.datetime?.split('-')[1]}:00`,
        date: obj.datetime?.split('-')[0],
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
            <Label basic color="red" hidden={cmpCheck} pointing="below">Please Slect Location</Label>
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
            <Label basic color="red" hidden={locationCheck} pointing="below">Please Slect Location</Label>
            <AsyncSelect
              id="location"
              backspaceRemovesValue
              isClearable
              value={input.location ? { label: input.displayLocation, value: input.displayLocation } : null}
              onChange={handleLocationSelect}
              loadOptions={findPlace}
              placeholder="Find The Place"
              validation
              required
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input name="date" value={input.date} type="date" onChange={handleChange} fluid label="Date" placeholder="Job Date" required />
          <Form.Input name="time" value={input.time} type="time" onChange={handleChange} fluid label="Time" placeholder="Job Time" required />
          <Form.Field>
            <label htmlFor="catSelect">Job Type</label>
            <Label basic color="red" hidden={typeCheck} pointing="below">Please Slect Location</Label>
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
        <Form.TextArea name="description" value={input.description} onChange={handleChange} label="Description" placeholder="Please Provide Job Details..." required />
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
