/* eslint-disable react-hooks/exhaustive-deps */
import {
  React, useEffect,
} from 'react';
import {
  Menu, Segment, Button, Icon,
} from 'semantic-ui-react';
import Image from 'next/image';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import { getInvitesByUser } from '../utils/data/invites';
import { useInvite } from '../utils/context/navContext';

export default function NavBar() {
  const { user } = useAuth();
  const { invites, updateInvites } = useInvite();

  const getNotifications = () => {
    getInvitesByUser(user.id).then(updateInvites(user.id));
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <Segment inverted attached size="mini">
      <Menu className="menu-container" inverted secondary stackable>
        <Link passHref href="/home">
          <Menu.Item
            content="Home"
          />
        </Link>
        <Link passHref href={`/user/${user.id}`}>
          <Menu.Item
            content="Add Job"
          />
        </Link>
        <Link passHref href="/invites">
          <Menu.Item
            content="Invites"
          />
        </Link>
        <Icon hidden={!invites?.length} name="bell" size="large" outline color="yellow" inverted />
        <Menu.Item
          className="scoped-nav"
          content="Scoped"
          position="right"
        />
        <Menu.Item position="right">
          <Image className="nav-user-image" src={user?.image} alt="" width={45} height={45} />
          <Link passHref href={`/user/${user.id}`}>
            <Menu.Item
              content={user.name}
            />
          </Link>
        </Menu.Item>
        <Menu.Item
          onClick={signOut}
        >
          <Button inverted color="red">Sign Out</Button>
        </Menu.Item>
      </Menu>
    </Segment>
  );
}
