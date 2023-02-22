import { useState } from 'react';
import { Menu, Segment, Button } from 'semantic-ui-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function NavbarLg() {
  const { user } = useAuth();
  const router = useRouter();
  const dynamicUser = `./user/${user.id}`;
  const [activeItem, setactiveItem] = useState('home');

  const handleItemClick = (e, { name }) => {
    setactiveItem(name);
    router.push(name);
  };

  return (
    <Segment inverted attached size="mini">
      <Menu inverted secondary stackable>
        <Menu.Item
          name="./myJobs"
          content="Home"
          active={activeItem === './myJobs'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="myJobs"
          active={activeItem === 'messages'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name={`./user/${user.id}`}
          content="Profile"
          active={activeItem === dynamicUser}
          onClick={handleItemClick}
          position="left"
        />
        <Menu.Item
          className="scoped-nav"
          content="Scoped"
          position="left"
        />
        <Image className="nav-user-image" src={user.image} alt="" width={45} height={45} />
        <Menu.Item
          name={user.name}
          active={activeItem === 'sign_in'}
          onClick={signOut}
        />
        <Menu.Item
          as="button"
          basic
          color="green"
          active={activeItem === 'sign_out'}
          onClick={signOut}
        >
          <Button
            inverted
            color="red"
          >Sign Out
          </Button>
        </Menu.Item>
      </Menu>
    </Segment>
  );
}
