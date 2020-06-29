import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CharCardList from './CharCardList';
import SelectedCharRating from './SelectedCharRating';
import { fetchChars, fetchCharById } from '../actions/char';
import { fetchMatchList } from '../actions/match';

const CharacterPage = ({
  fetchChars,
  fetchMatchList,
  fetchCharById,
  location,
  char: { char, chars },
  match: { matchs },
}) => {
  const [term, setTerm] = useState('');
  useEffect(() => {
    fetchChars();
    fetchMatchList();
    const id = location.pathname.split('/')[2];
    fetchCharById(id);
  }, [fetchChars, fetchMatchList, location.pathname, fetchCharById]);

  const manageInputChange = (e) => {
    setTerm(e.target.value);
    // console.log(e.target.value);
  };
  // const filteredList = chars.filter((nchar) => {
  //   return nchar.id !== char._id.toString();
  // });
  const ratingDisplay = () => {
    if (char && chars && matchs) {
      return (
        <Fragment>
          <SelectedCharRating selectedChar={char} />
          <div>
            <input
              type="text"
              onChange={(e) => manageInputChange(e)}
              value={term}
              style={{ border: '1px solid black' }}
            />
          </div>
          <CharCardList
            charList={chars.filter((nchar) => {
              if (term !== '')
                return nchar._id !== char._id && nchar.name.includes(term);
              return nchar._id !== char._id;
            })}
            rutaActual={location.pathname}
          />
        </Fragment>
      );
    }
    return null;
  };

  return <Fragment>{ratingDisplay()}</Fragment>;
};
const mapStateToProps = (state) => {
  return {
    char: state.char,
    match: state.match,
  };
};
CharacterPage.propTypes = {
  fetchChars: PropTypes.func.isRequired,
  fetchMatchList: PropTypes.func.isRequired,
  fetchCharById: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  char: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
  fetchChars,
  fetchCharById,
  fetchMatchList,
})(CharacterPage);
