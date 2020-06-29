import React from 'react';
import { Link } from 'react-router-dom';
import history from '../History';
import { connect } from 'react-redux';
import { fetchChars, fetchCharById } from '../actions/char';

class Navbar extends React.Component {
  onAutoComplete = (info) => {
    const nchar = this.props.charList.find((c) => c.nombre === info);
    // this.props.fetchCharById(nchar.id);
    return history.push(`/ratings/${nchar.id}`);
  };
  autocomplete() {
    const { charList } = this.props;
    if (!charList) return null;
    let characterData = {};
    charList.forEach((element) => {
      characterData[element.nombre] = element.url;
    });
    return characterData;
  }
  render() {
    return (
      <div>
        <div className="nav-wrapper">
          <Link to="/characters" className="brand-logo">
            Logo
          </Link>
          <form>
            <Autocomplete
              data={this.autocomplete()}
              id="navbar"
              className="col s4 right"
              onAutoComplete={this.onAutoComplete}
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { charList: state.charList };
};

export default connect(mapStateToProps, { fetchChars, fetchCharById })(Navbar);
