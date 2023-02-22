/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-3">
      <Link passHref href="/">
        <Navbar.Brand>Scoped</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="nav-links">
          <Link passHref href="/">
            <Nav.Link>Home</Nav.Link>
          </Link>
          <Link passHref href="/delete-me">
            <Nav.Link>Delete Me</Nav.Link>
          </Link>
          <div className="nav-right">
            <Link passHref href="/">
              <Nav.Link>Hello {user.name || user.fbUser.displayName}</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Image className="user-nav-image" src={user.image} />
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
