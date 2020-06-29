import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddCharSection from './AddCharSection';
import CharCardList from './CharCardList';
import { fetchChars } from '../actions/char';

const LandingPage = ({ fetchChars, location, char: { chars } }) => {
  useEffect(() => {
    fetchChars();
  }, [fetchChars]);

  return (
    <Fragment>
      <AddCharSection />
      <CharCardList charList={chars} rutaActual={location.pathname} />
    </Fragment>
  );
};
LandingPage.propTypes = {
  fetchChars: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  char: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    char: state.char,
  };
};
export default connect(mapStateToProps, { fetchChars })(LandingPage);
