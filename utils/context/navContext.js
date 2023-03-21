import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { getCmpInvitesByUser, getInvitesByUser } from '../data/invites';
import { useAuth } from './authContext';

const NavContext = createContext();

NavContext.displayName = 'NavContext';

const InviteProvider = (props) => {
  const { user } = useAuth();
  const [invites, setInvites] = useState([]);
  const [compInvites, setCompInvites] = useState([]);

  const updateInvites = useMemo(
    () => () => getInvitesByUser(user?.id).then((data) => {
      getCmpInvitesByUser(user?.id).then((offers) => {
        setCompInvites(offers);
      });
      setInvites(data);
    }),
    [user?.id],
  );

  useEffect(() => {
    if (user?.id) {
      getInvitesByUser(user?.id).then((data) => {
        getCmpInvitesByUser(user?.id).then((offers) => {
          setCompInvites(offers);
        });
        setInvites(data);
      });
    } else {
      setInvites(null);
    }
  }, [user?.id, updateInvites]);

  const value = useMemo(
    () => ({
      invites,
      compInvites,
      updateInvites,
    }),
    [invites, updateInvites, compInvites],
  );

  return <NavContext.Provider value={value} {...props} />;
};

const InviteConsumer = NavContext.Consumer;

const useInvite = () => {
  const context = useContext(NavContext);

  return context;
};

export { InviteProvider, useInvite, InviteConsumer };
