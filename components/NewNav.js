/* eslint-disable react-hooks/exhaustive-deps */
import {
  React,
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
  const router = useRouter();
  // const invitations = invites.concat(compInvites);

  const signOutFunction = () => {
    router.push('/');
    signOut();
  };

  return (

    <Menu className="menu-container" borderless inverted stackable>
      <Link passHref href="/">
        <Menu.Item
          content="Home"
        />
      </Link>
      <Link passHref href="/invites">
        <Menu.Item>
          Invites
          <Icon hidden={!(invites?.length || compInvites?.length)} name="bell" size="large" color="yellow" inverted />
        </Menu.Item>
      </Link>
      <Menu.Item>
        <Dropdown
          text="Companies"
          pointing
        >
          <Dropdown.Menu className="company-dropdown">
            {user.companies?.map((cmp) => (
              <Link key={cmp.id} passHref href={`/company/${cmp.company.id}`}>
                <Dropdown.Item
                  image={cmp.company.logo}
                  content={cmp.company.name}
                />
              </Link>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
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
          <Dropdown.Menu>
            <Link passHref href="/profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Link passHref href="/job/new">
              <Dropdown.Item>Create Job</Dropdown.Item>
            </Link>
            <Link passHref href="/company/new">
              <Dropdown.Item>Create Company</Dropdown.Item>
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
