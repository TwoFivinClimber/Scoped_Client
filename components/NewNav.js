/* eslint-disable react-hooks/exhaustive-deps */
import {
  React, useState,
} from 'react';
import {
  Menu, Button, Icon, Image, Dropdown,
} from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import { useInvite } from '../utils/context/navContext';

export default function NavBar() {
  const { user } = useAuth();
  const { invites, compInvites } = useInvite();
  const [active, setActive] = useState('');
  const router = useRouter();
  // const invitations = invites.concat(compInvites);

  const signOutFunction = () => {
    router.push('/');
    signOut();
  };

  const handleClick = (e) => {
    const { id } = e.target;
    setActive(id);
  };

  return (

    <Menu className="menu-container" size="large" pointing borderless inverted stackable>
      <Link passHref href="/">
        <Menu.Item
          id="home"
          onClick={handleClick}
          inline
          active={active === 'home'}
          content="Jobs"
        />
      </Link>
      <Link passHref href="/invites">
        <Menu.Item
          id="invites"
          inline
          active={active === 'invites'}
          onClick={handleClick}
        >
          Invites
          <Icon hidden={!(invites?.length || compInvites?.length)} name="bell" size="large" color="yellow" inverted />
        </Menu.Item>
      </Link>
      <Dropdown
        item
        text="Companies"
        pointing
      >
        <Dropdown.Menu>
          {user.companies?.map((cmp) => (
            <Link key={cmp.id} passHref href={`/company/${cmp.company.id}`}>
              <Dropdown.Item
                className="company-drop-items"
                icon={{ as: 'img', avatar: true, src: cmp.company.logo }}
                content={cmp.company.name}
              />
            </Link>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item
        className="scoped-nav"
        content="Scoped"
        position="right"
      />
      <Menu.Item position="right">
        <Image className="nav-user-image" src={user?.image || user.fbUser?.photoURL} alt="" width={45} height={45} />
        <Dropdown
          text={user.name || user.fbUser.displayName}
          pointing
          className="link item"
        >
          <Dropdown.Menu
            id="profile"
            onClick={handleClick}
            active={active === 'profile'}
          >
            <Link passHref href="/profile">
              <Dropdown.Item
                icon="user"
                content="Profile"
              />
            </Link>
            <Link passHref href="/job/new">
              <Dropdown.Item
                content="Create Job"
                icon="write"
              />
            </Link>
            <Link passHref href="/company/new">
              <Dropdown.Item
                content="Create Company"
                icon="bullhorn"
              />
            </Link>
          </Dropdown.Menu>
        </Dropdown>

      </Menu.Item>
      <Menu.Item
        onClick={signOutFunction}
      >
        <Button inverted color="red">Sign Out</Button>
      </Menu.Item>
    </Menu>
  );
}
