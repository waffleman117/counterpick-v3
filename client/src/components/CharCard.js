import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCharById } from '../actions/char';

import CardInfo from './CardInfo';

const CharCard = ({ id, url, name, rutaActual, fetchCharById }) => {
  const charDisplay = () => {
    //console.log(name);
    const nombreFix = name[0].toUpperCase() + name.slice(1);

    if (rutaActual.includes('/ratings')) {
      //si estamos en /ratings se despliega con botones
      return (
        <div className="col s3">
          <div className="card">
            <div className="card-image">
              <Link
                to={{ pathname: `/ratings/${id}` }}
                onClick={() => fetchCharById(id)}
              >
                <img
                  src={url}
                  alt="El URL de Imagen no es valido"
                  style={{
                    alignContent: 'center',
                    height: '10rem',
                    width: '10rem',
                  }}
                />
                <span className="card-title"></span>
              </Link>
            </div>
            <div className="center card-content">
              <CardInfo nombreFix={nombreFix} charObj={{ id, url, name }} />
            </div>
          </div>
        </div>
      );
    }
    //si no estamos en /ratings se despliega sin botones
    return (
      <div className="col s2">
        <Link
          to={{ pathname: `/ratings/${id}` }}
          onClick={() => fetchCharById(id)}
        >
          <div className="card">
            <div className="card-image">
              <img
                src={url}
                alt="El URL de Imagen no es valido"
                style={{ height: '10rem', width: '10rem' }}
              />
              <span className="card-title"></span>
            </div>
            <div className="card-content">
              <p>{nombreFix}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return <Fragment>{charDisplay()}</Fragment>;
};
CharCard.propTypes = {
  fetchCharById: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rutaActual: PropTypes.string.isRequired,
};

export default connect(null, { fetchCharById })(CharCard);
