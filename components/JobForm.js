/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import {
  Form, Button, Image, List, Header, Grid, Item,
} from 'semantic-ui-react';
import AsyncSelect from 'react-select/async';
import AsyncCreatable from 'react-select/async-creatable';
import getSkills from '../utils/data/skills';
import { findPlace } from '../utils/data/location';

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
  gear: [],
  crew: [],
};

function JobForm() {
  const [input, setInput] = useState(initialState);
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.warn(typeof name, typeof value);
  };

  const handleCategory = (selected) => {
    setInput((prev) => ({
      ...prev,
      category: selected,
    }));
  };

  const placeOptions = (query) => {
    findPlace(query).then((response) => {
      console.warn(response);
    });
  };

  const handleImage = (e) => {
    setImages((prev) => [
      ...prev,
      ...e.target.files,
    ]);
  };

  const handleSubmit = () => {
    console.warn(input);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input name="title" value={input.title} onChange={handleChange} fluid label="Title" placeholder="Job Title" />
        <Form.Field>
          <label htmlFor="location">Location</label>
          <AsyncCreatable
            id="location"
            classNamePrefix="select"
            backspaceRemovesValue
            isClearable
          // onChange={handleLocationSelect}
            loadOptions={placeOptions}
            required
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input name="date" value={input.date} type="date" onChange={handleChange} fluid label="Date" placeholder="Job Date" />
        <Form.Input name="time" value={input.time} type="time" onChange={handleChange} fluid label="Time" placeholder="Job Time" />
        <Form.Field>
          <label htmlFor="catSelect">Skills</label>
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
          <Button onClick={() => setOpen(!open)} color="blue">Select Crew</Button>
        </div>
        <div>
          <Button onClick={() => setOpen(!open)} color="orange">Select Gear</Button>
        </div>
      </Form.Group>
      <Grid divided textAlign="centered" columns={2}>
        <Grid.Column textAlign="center">
          <Header>Crew</Header>
          <List horizontal>
            <List.Item>
              <Image avatar src="https://react.semantic-ui.com/images/avatar/small/tom.jpg" />
              <List.Content>
                <List.Header>Tom</List.Header>
                Top Contributor
              </List.Content>
            </List.Item>
          </List>
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Header>Gear</Header>
          <List bulleted horizontal>
            <List.Item>Rope Access Kit</List.Item>
            <List.Item>Rope Access Kit</List.Item>
            <List.Item>Rope Access Kit</List.Item>
            <List.Item>Rope Access Kit</List.Item>
          </List>
        </Grid.Column>
      </Grid>
      <Form.Input type="file" multiple onChange={handleImage} fluid label="Images" placeholder="Upload Images" />
      <Item.Group className="job-form-image-item-div">
        {images?.map((i) => (
          <Item className="job-form-image-item">
            <Image className="job-form-image" src={URL.createObjectURL(i)} />
            <Item.Content header verticalAlign="middle">Description of this photo goes here</Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Form>
  );
}

export default JobForm;
