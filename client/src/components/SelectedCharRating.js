import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

const SelectedCharRating = ({ selectedChar }) => {
  useEffect(() => {}, [selectedChar]);
  if (!selectedChar) return null;
  const nombreFix =
    selectedChar.name[0].toUpperCase() + selectedChar.name.slice(1);
  return (
    <Fragment>
      <div className="row">
        <div className="col s3"></div>
        <div className="col s6">
          <div className="card">
            <div className="card-image">
              <img
                src={selectedChar.url}
                alt="El URL de Imagen no es valido"
                style={{ height: '30rem' }}
              />
              <span className="card-title"></span>
            </div>
            <div className="card-content">
              <h1>
                <p>{nombreFix}</p>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
SelectedCharRating.propTypes = {
  selectedChar: PropTypes.object.isRequired,
};

export default SelectedCharRating;
