/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.css';
import { AuthProvider } from '../utils/context/authContext';
import { InviteProvider } from '../utils/context/navContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <InviteProvider>
        {' '}
        {/* gives children components access to user and auth methods */}
        <ViewDirectorBasedOnUserAuthStatus
        // if status is pending === loading
        // if status is logged in === view app
        // if status is logged out === sign in page
          component={Component}
          pageProps={pageProps}
        />
      </InviteProvider>
    </AuthProvider>
  );
}

export default MyApp;
