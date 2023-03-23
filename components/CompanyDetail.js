import React, { useState } from 'react';
import {
  Header, Grid, Image, Divider, Segment, List, Dropdown, Confirm, Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteCompany } from '../utils/data/company';
import LogoModal from './LogoModal';
import EmployeeManager from './EmployeeManager';
import { useInvite } from '../utils/context/navContext';

function CompanyDetail({ company, employees, onUpdate }) {
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [abri, setAbri] = useState(false);
  const admin = (router.pathname.split('/')[2] === 'admin');
  const { updateInvites } = useInvite();

  const handleDelete = () => {
    deleteCompany(company.id);
    updateInvites();
    router.push('/');
  };

  return (
    <>
      <Segment>
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h1">{company?.name}</Header>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Dropdown
              className="link item"
              icon="ellipsis horizontal"
              hidden={!company.admin}
            >
              <Dropdown.Menu>
                <Link passHref href={`/company/admin/${company.id}`}>
                  <Dropdown.Item hidden={admin}>Admin</Dropdown.Item>
                </Link>
                <Link passHref href={`/company/edit/${company.id}`}>
                  <Dropdown.Item hidden={!admin}>Edit Info</Dropdown.Item>
                </Link>
                <Link passHref href={`/company/admin/invites/${company.id}`}>
                  <Dropdown.Item hidden={!admin}>Invites</Dropdown.Item>
                </Link>
                {admin ? (<Dropdown.Item onClick={() => setConfirm(!confirm)} hidden={!company.isowner}>Delete Company</Dropdown.Item>) : (' ') }
              </Dropdown.Menu>
            </Dropdown>
            <Confirm
              className="crew-modal"
              open={confirm}
              cancelButton="Never mind"
              confirmButton="Delete It"
              onCancel={() => setConfirm(!confirm)}
              onConfirm={() => handleDelete()}
            />
          </Grid.Column>
        </Grid>
        <Grid columns={3} divided>
          <Grid.Column as="h5">
            <li>{company.type}</li>
            <Divider />
            <li>{company.location}</li>
            <Divider />
            <li>Scoped Since: {company.creation}</li>
            <Divider />
            <li>Owner: {company.owner?.name}</li>
            <Divider />
            <li>707-621-1665</li>
            <Divider />
            <li>{company.owner?.email}</li>
          </Grid.Column>
          <Grid.Column>
            <Image centered size="medium" src={company.logo} />
            <Button centered hidden={!admin} onClick={() => setOpen(!open)}>Upload Logo</Button>
          </Grid.Column>
          <Grid.Column className="job-crew-column">
            <Header as="h4">Employees
            </Header>
            <List horizontal relaxed>
              {company.employees?.map((i) => (
                <List.Item hidden={i.user.id === company.owner?.id} key={i.id}>
                  <Image avatar src={i.user.image} />
                  <List.Content>
                    <List.Header>{i.user.name}</List.Header>
                  </List.Content>
                </List.Item>
              ))}
            </List>
            <Button hidden={!admin} onClick={() => setAbri(!abri)}>Manage Employees</Button>
          </Grid.Column>
        </Grid>
        <Header as="h3">About</Header>
        <p>{company.description}</p>
      </Segment>
      <LogoModal open={open} setOpen={setOpen} logo={company.logo} cid={company.id} onUpdate={onUpdate} />
      <EmployeeManager employees={employees} companySkills={company.skills} ownerId={company.owner?.id} cid={company.id} abri={abri} setAbri={setAbri} onUpdate={onUpdate} />
    </>
  );
}

CompanyDetail.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      admin: PropTypes.bool,
    }),
  ).isRequired,
  company: PropTypes.shape({
    id: PropTypes.number,
    admin: PropTypes.bool,
    isowner: PropTypes.bool,
    invited: PropTypes.bool,
    owner: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    name: PropTypes.string,
    image: PropTypes.string,
    logo: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    creation: PropTypes.string,
    employees: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        user: PropTypes.shape({
          name: PropTypes.string,
          image: PropTypes.string,
        }),
      }),
    ),
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        skill: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default CompanyDetail;
