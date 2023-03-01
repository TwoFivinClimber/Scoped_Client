import React, { useState } from 'react';
import {
  Grid, Header, List, Image, Button, Form,
} from 'semantic-ui-react';

function Crew() {
  const [open, setOpen] = useState(false);
  const [abri, setAbri] = useState(false);
  return (
    <>
      <Grid divided textAlign="centered" columns={2}>
        <Form.Group className="job-form-buttons" widths="equal">
          <div>
            <Button type="button" onClick={() => setOpen(!open)} color="blue">Select Crew</Button>
          </div>
          <div>
            <Button type="button" onClick={() => setAbri(!abri)} color="orange">Select Gear</Button>
          </div>
        </Form.Group>
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
          </List>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Crew;
