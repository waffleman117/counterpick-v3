import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import Header from './components/Header';
import LandingPage from './components/LandingPage';
import CharacterPage from './components/CharacterPage';
import history from './History';

import store from './store';

const App = (props) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <Header appProps={props} />
          <div className="container" style={{ marginTop: '50px' }}>
            <Route path="/" exact component={LandingPage} />
            <Route path="/ratings" component={CharacterPage} />
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
