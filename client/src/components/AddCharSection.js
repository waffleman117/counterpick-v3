import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestCharPost } from '../actions/char';

const AddCharSection = ({ requestCharPost }) => {
  let [newCharName, setCharNameText] = useState('');
  let [newCharUrl, setCharUrlText] = useState('');

  const manageNameChange = (e) => {
    setCharNameText(e.target.value);
  };
  const manageUrlChange = (e) => {
    setCharUrlText(e.target.value);
  };
  const manageSubmit = (e) => {
    //e.preventDefault();
    //Uso la funcion postChar de redux
    requestCharPost({
      name: newCharName.toLowerCase(),
      url: newCharUrl,
    });
    //vaciar los espacios
    newCharName = '';
    newCharUrl = '';
    //this.setState({newCharName:'',newCharUrl:''});
  };
  return (
    <div>
      <div className="row">
        <div className="center col s12">
          <div className="card red darken-1">
            <div className="card-content white-text">
              <span className="card-title">Añadir nuevo personaje</span>
              <p>Crea un nuevo personaje para la lista:</p>
            </div>
            <div className="card-action">
              <form onSubmit={(e) => manageSubmit(e)}>
                <div className="input-field inline">
                  <input
                    placeholder="Nombre del Personaje"
                    id="name"
                    type="text"
                    className="validate"
                    onChange={(e) => manageNameChange(e)}
                    value={newCharName}
                    required
                  />
                  <span
                    className="helper-text"
                    data-error="wrong"
                    data-success="right"
                  ></span>
                </div>
                <div className="input-field inline">
                  <input
                    placeholder="URL de la imagen"
                    id="urlChar"
                    type="url"
                    className="validate"
                    onChange={(e) => manageUrlChange(e)}
                    value={newCharUrl}
                    required
                  />
                  <span
                    className="helper-text"
                    data-error="wrong"
                    data-success="right"
                  ></span>
                </div>
                <br />
                <button className="btn waves-effect red" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
AddCharSection.propTypes = {
  requestCharPost: PropTypes.func.isRequired,
};
export default connect(null, { requestCharPost })(AddCharSection);
