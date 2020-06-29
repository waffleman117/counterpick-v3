import React from 'react';
import PropTypes from 'prop-types';
import CharCard from './CharCard';

const CharCardList = ({ charList, rutaActual }) => {
  const renderedList = () => {
    //console.log(charList);
    //se despliega la lista que se nos paso sea cual sea
    return charList.map((charCard, i) => {
      return (
        <CharCard
          key={i}
          id={charCard._id}
          name={charCard.name}
          url={charCard.url}
          rutaActual={rutaActual}
        />
      );
    });
  };
  return (
    <div style={{ marginTop: '20px' }}>
      <div className="row">{renderedList()}</div>
    </div>
  );
};
CharCardList.propTypes = {
  charList: PropTypes.array.isRequired,
  rutaActual: PropTypes.string.isRequired,
};

export default CharCardList;
