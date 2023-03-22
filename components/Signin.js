import React, { useEffect, useState } from 'react';
import { Button, Image, Transition } from 'semantic-ui-react';

import { signIn } from '../utils/auth';

function Signin() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="landing-container">
      <Transition transitionOnMount animation="scale" visible={show} duration={8000}>
        <Image className="scoped-image" src="./images/scoped.png" centered size="big" alt="scoped logo, a sight with crosshairs" />
      </Transition>
      <div className="sign-in-button-div">
        <Transition transitionOnMount animation="scale" visible={show} duration={4000}>
          <Button className="sign-in-button" type="button" size="large" inverted color="orange" onClick={signIn}>Sign in</Button>
        </Transition>
      </div>
    </div>
  );
}

export default Signin;
