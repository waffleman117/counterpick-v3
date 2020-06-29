import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUserStatus, setUserId } from '../actions/googleApi';

const GoogleAuth = ({ setUserStatus, setUserId, userLoggedIn }) => {
  let [auth, setAuthObj] = useState(null);
  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          //returns promise
          clientId:
            '3990839912-1l6vpf99pc4rlr67kt4behqn7ehvo51d.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          auth = window.gapi.auth2.getAuthInstance();
          setAuthObj(auth);
          //console.log('auth status', auth.isSignedIn.get());
          setUserStatus(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
          let userId = auth.currentUser.get().getId();
          //console.log('User id on start: ', userId);
          setUserId(userId);
        });
    });
  }, []);

  const onAuthChange = () => {
    setUserStatus(auth.isSignedIn.get());
  };

  const onSignIn = async () => {
    console.log('auth aqui:', auth);
    await auth.signIn();
    let userId = auth.currentUser.get().getId();
    //console.log("User id: ",userId);
    setUserId(userId);
  };

  const onSignOut = async () => {
    await auth.signOut();
    //force page refresh para que se borre la sesion y el userId vuelva a ser null
    window.location.reload(true);
  };

  const renderAuthButton = () => {
    if (userLoggedIn === null) {
      return null;
    } else if (userLoggedIn) {
      return (
        <button onClick={onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign out
        </button>
      );
    } else {
      return (
        <button onClick={onSignIn} className="ui green google button">
          <i className="google icon" />
          Sign in with google
        </button>
      );
    }
  };
  return <Fragment>{renderAuthButton()}</Fragment>;
};
GoogleAuth.propTypes = {
  setUserStatus: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
  userLoggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.googleApi.userLoggedIn,
  };
};

export default connect(mapStateToProps, { setUserStatus, setUserId })(
  GoogleAuth
);
