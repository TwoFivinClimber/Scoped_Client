import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { getInvitesByUser } from '../data/invites';

const NavContext = createContext();

NavContext.displayName = 'NavContext';

const InviteProvider = (props) => {
  const [invites, setInvites] = useState(null);

  const updateInvites = useMemo(
    () => (id) => getInvitesByUser(id).then((data) => {
      setInvites(data);
    }),
    [],
  );

  const value = useMemo(
    () => ({
      invites,
      updateInvites,
    }),
    [invites, updateInvites],
  );

  return <NavContext.Provider value={value} {...props} />;
};

const InviteConsumer = NavContext.Consumer;

const useInvite = () => {
  const context = useContext(NavContext);

  return context;
};

export { InviteProvider, useInvite, InviteConsumer };
