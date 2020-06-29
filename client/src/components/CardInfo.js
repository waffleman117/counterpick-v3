import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchMatchList,
  deleteMatch,
  addMatch,
  updateMatch,
} from '../actions/match';

const CardInfo = ({
  fetchMatchList,
  deleteMatch,
  addMatch,
  updateMatch,
  selectedChar,
  matchList,
  userLoggedIn,
  userId,
  charObj,
  nombreFix,
}) => {
  useEffect(() => {
    fetchMatchList();
  }, [fetchMatchList, deleteMatch, addMatch, updateMatch]);

  const sortVotes = () => {
    let matchObjs;
    let miScoreDisplay = 0;
    //verificar si son matchs
    matchObjs = matchList.filter(
      (match) =>
        match.players.includes(charObj.id) &&
        match.players.includes(selectedChar._id)
    );
    matchObjs.forEach((matchObj) => {
      if (matchObj) {
        //si lo son, entonces pregunto si gane yo
        if (matchObj.winnerId === charObj.id) {
          //si yo gane entonces sumo a mi scoreDisplay +1
          miScoreDisplay++;
        } else {
          //sino entonces gano el selectedChar y resto a mi scoreDisplay -1
          miScoreDisplay--;
        }
      }
    });
    //si no existe match entonces scoreDisplay no se modificara ( queda = 0)
    return miScoreDisplay;
  };
  const onStrongClick = async () => {
    let matchObj;
    //verificar si son matchs
    matchObj = matchList.find(
      (match) =>
        match.players.includes(charObj.id) &&
        match.players.includes(selectedChar._id) &&
        match.userId === userId
    );
    if (matchObj) {
      //si ya era strong
      if (matchObj.winnerId === charObj.id) {
        //delete relacion del matchs entre charObj.id, selectedChar._id y el user
        await deleteMatch(matchObj._id);
      } else {
        //si el voto ya estaba en contra y seleccionamos strong (UPDATE)
        matchObj.winnerId = charObj.id;
        updateMatch(matchObj);
      }
    } else {
      //si no habias elegido nada (matchObj === undefined)
      //crear relacion de matchs con charObj como winner( charObj.id, selectedChar._id, charObj.id y su user)
      addMatch({
        players: [charObj.id, selectedChar._id],
        winnerId: charObj.id,
        userId: userId,
      });
    }
  };

  const onWeakClick = () => {
    let matchObj;
    //verificar si son matchs
    matchObj = matchList.find(
      (match) =>
        match.players.includes(charObj.id) &&
        match.players.includes(selectedChar._id) &&
        match.userId === userId
    );
    if (matchObj) {
      //si ya era weak
      if (matchObj.winnerId === selectedChar._id) {
        //delete relacion de matchs entre( charObj.id , selectedChar._id)
        deleteMatch(matchObj._id);
      } else {
        //si el voto ya estaba en strong y seleccionamos weak (UPDATE)
        matchObj.winnerId = selectedChar._id;
        updateMatch(matchObj);
      }
    } else {
      //crear relacion de matchs con selected char como winner (charObj pierde) y su user
      addMatch({
        players: [charObj.id, selectedChar._id],
        winnerId: selectedChar._id,
        userId: userId,
      });
    }
  };
  const renderIndicators = () => {
    let userLogged = userLoggedIn;
    if (userLogged) {
      if (sortVotes() > 0)
        return (
          <Fragment>
            <a className="btn-floating btn-large waves-effect green">
              <i className="material-icons"></i>
            </a>
            {renderButtons()}
          </Fragment>
        );
      else if (sortVotes() < 0)
        return (
          <Fragment>
            <a className="btn-floating btn-large waves-effect red">
              <i className="material-icons"></i>
            </a>
            {renderButtons()}
          </Fragment>
        );
      else return <div>{renderButtons()}</div>;
    } else {
      return (
        <Fragment>
          <button
            className="waves-effect blue btn disabled"
            onClick={onStrongClick}
          >
            Strong
          </button>
          <button
            className="waves-effect blue btn disabled"
            onClick={onWeakClick}
          >
            Weak
          </button>
        </Fragment>
      );
    }
  };
  const renderButtons = () => {
    let matchObj;
    //verificar si son matchs
    matchObj = matchList.find(
      (match) =>
        match.players.includes(charObj.id) &&
        match.players.includes(selectedChar._id) &&
        match.userId === userId
    );
    if (matchObj) {
      if (matchObj.winnerId === charObj.id) {
        return (
          <Fragment>
            <button className="waves-effect green btn" onClick={onStrongClick}>
              Strong
            </button>
            <button className="waves-effect blue btn" onClick={onWeakClick}>
              Weak
            </button>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <button className="waves-effect blue btn" onClick={onStrongClick}>
              Strong
            </button>
            <button className="waves-effect red btn" onClick={onWeakClick}>
              Weak
            </button>
          </Fragment>
        );
      }
    }
    return (
      <Fragment>
        <button className="waves-effect blue btn" onClick={onStrongClick}>
          Strong
        </button>
        <button className="waves-effect blue btn" onClick={onWeakClick}>
          Weak
        </button>
      </Fragment>
    );
  };
  const renderScore = () => {
    if (userLoggedIn) return <Fragment>Puntuacion: {sortVotes()}</Fragment>;
    else return <Fragment>Inicia sesion para votar</Fragment>;
  };
  return (
    <Fragment>
      <br />
      {nombreFix}
      <br />
      {renderScore()}
      <br />
      {renderIndicators()}
    </Fragment>
  );
};
CardInfo.propTypes = {
  fetchMatchList: PropTypes.func.isRequired,
  deleteMatch: PropTypes.func.isRequired,
  addMatch: PropTypes.func.isRequired,
  updateMatch: PropTypes.func.isRequired,
  selectedChar: PropTypes.object.isRequired,
  matchList: PropTypes.array.isRequired,
  userLoggedIn: PropTypes.bool,
  userId: PropTypes.string,
  charObj: PropTypes.object.isRequired,
  nombreFix: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  //provoca refresh cuando hay cambios
  return {
    selectedChar: state.char.char,
    matchList: state.match.matchs,
    userLoggedIn: state.googleApi.userLoggedIn,
    userId: state.googleApi.userId,
  };
};

export default connect(mapStateToProps, {
  fetchMatchList,
  deleteMatch,
  addMatch,
  updateMatch,
})(CardInfo);
