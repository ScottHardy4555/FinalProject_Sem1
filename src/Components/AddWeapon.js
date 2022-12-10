import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddWeapon.css';

function AddWeapon(props) {
  // id, name, die_num, die_type, dmg_type, weight, value, properties[], isMartial, isSimple

  const [name, setName] = useState('');
  const [die_num, setDie_num] = useState(1);
  const [die_type, setDie_type] = useState('');
  const [dmg_type, setDmg_type] = useState('');
  const [weight, setWeight] = useState(0);
  const [value, setValue] = useState(0);
  const [properties, setProperties] = useState('');
  const [isMartial, setIsMartial] = useState('false');
  const [isRanged, setIsRanged] = useState('false');
  const [selectedFile, setSelectedFile] = useState(null);

  // Validator Controls
  const [invalidName, setInvalidName] = useState(false);
  const [invalidDie_num, setInvalidDie_num] = useState(false);
  const [invalidDie_type, setInvalidDie_type] = useState(false);
  const [invalidDmg_type, setInvalidDmg_type] = useState(false);
  const [invalidWeight, setInvalidWeight] = useState(false);
  const [invalidValue, setInvalidValue] = useState(false);
  const [invalidselectedFile, setInvalidSelectedFile] = useState(false);

  // Working property container
  const [property, setProperty] = useState('');

  function addProperty() {
    if (property) setProperties([...properties, property]);
    setProperty('');
  }

  function deleteProperty(deleteProp) {
    setProperties(properties.filter((prop) => prop !== deleteProp));
  }

  function imgUpdate(evt) {
    setSelectedFile(evt.target.files[0]);
  }

  function validateWeapon() {
    setInvalidName(false);
    setInvalidDie_num(false);
    setInvalidDie_type(false);
    setInvalidDmg_type(false);
    setInvalidWeight(false);
    setInvalidValue(false);
    setInvalidSelectedFile(false);

    if (
      name &&
      die_num > 0 &&
      die_type &&
      dmg_type &&
      weight >= 0 &&
      weight !== '' &&
      value >= 0 &&
      value !== '' /*&& selectedFile*/
    )
      return true;

    if (!name) setInvalidName(true);

    if (die_num <= 0) setInvalidDie_num(true);

    if (!die_type) setInvalidDie_type(true);

    if (!dmg_type) setInvalidDmg_type(true);

    if (weight < 0 || weight === '') setInvalidWeight(true);

    if (value < 0 || value === '') setInvalidValue(true);

    if (!selectedFile) setInvalidSelectedFile(true);

    return false;
  }

  // function resetForm() {
  //   setName('');
  //   setDie_num(1);
  //   setDie_type('');
  //   setDmg_type('');
  //   setWeight(0);
  //   setValue(0);
  //   setProperty(null);
  //   setIsMartial(false);
  //   setIsRanged(false);
  //   setSelectedFile(null);
  // }

  function save() {
    if (validateWeapon()) {
      const newWeapon = {
        id: nanoid(),
        name: name,
        die_type: die_type,
        die_num: die_num,
        dmg_type: dmg_type,
        weight: weight,
        value: value,
        properties: properties,
        isMartial: isMartial,
        isRanged: isRanged,
        image: URL.createObjectURL(selectedFile),
      };
      props.addWeapon(newWeapon);
      // resetForm();
    }
  }

  return (
    <div className="row mt-5" id="addWeapon">
      <h3>Add Weapon</h3>
      {/* NAME */}
      <div className="col-md-3" id="name-container">
        <label htmlFor="inputName" className="form-label">
          {invalidName && <span className="text-danger">*</span>}Weapon name:
        </label>
        <input
          type="text"
          id="inputName"
          name="inputName"
          className="form-control"
          onChange={(evt) => setName(evt.currentTarget.value)}
          value={name}
          placeholder="Dagger"
        />
      </div>

      {/* DIE NUM */}
      <div className="col-md-3" id="die_num-container">
        <label htmlFor="input-die_num" className="form-label">
          {invalidDie_num && <span className="text-danger">*</span>}Number of dice:
        </label>
        <input
          type="number"
          id="input-die_num"
          name="input-die_num"
          className="form-control"
          onChange={(evt) => setDie_num(parseInt(evt.currentTarget.value))}
          value={die_num}
        />
      </div>

      {/* DIE TYPE */}
      <div className="col-md-3" id="die_type-container">
        <label htmlFor="input-die_type" className="form-label">
          {invalidDie_type && <span className="text-danger">*</span>}Die type:
        </label>
        <br />
        <select
          name="input-die_type"
          id="input-die_type"
          className="form-select"
          value={die_type}
          onChange={(evt) => setDie_type(parseInt(evt.currentTarget.value))}
        >
          <option value="" disabled>
            Choose a die...
          </option>
          <option value="1">d1</option>
          <option value="4">d4</option>
          <option value="6">d6</option>
          <option value="8">d8</option>
          <option value="10">d10</option>
          <option value="12">d12</option>
          <option value="20">d20</option>
        </select>
      </div>

      {/* DMG TYPE */}
      <div className="col-md-3" id="dmg_type-container">
        <label htmlFor="input-dmg_type" className="form-label">
          {invalidDmg_type && <span className="text-danger">*</span>}Dmg type:
        </label>
        <input
          list="input-dmg-types"
          id="input-dmg-list"
          name="input-dmg-list"
          className="form-control"
          value={dmg_type}
          onChange={(evt) => setDmg_type(evt.currentTarget.value)}
          placeholder="slashing"
        />
        <datalist id="input-dmg-types">
          <option value="bludgeoning">Bludgeoning</option>
          <option value="piercing">Piercing</option>
          <option value="slashing">Slashing</option>
        </datalist>
        <br />
      </div>

      {/* WEIGHT */}
      <div className="col-md-3" id="weight-container">
        <label htmlFor="input-weight" className="form-label">
          {invalidWeight && <span className="text-danger">*</span>}Weight:
        </label>
        <input
          type="number"
          id="input-weight"
          name="input-weight"
          className="form-control"
          onChange={(evt) => setWeight(parseInt(evt.currentTarget.value))}
          value={weight}
        />
      </div>

      {/* VALUE */}
      <div className="col-md-3" id="value-container">
        <label htmlFor="input-value" className="form-label">
          {invalidValue && <span className="text-danger">*</span>}Value:
        </label>
        <input
          type="number"
          id="input-value"
          name="input-value"
          className="form-control"
          onChange={(evt) => setValue(parseInt(evt.currentTarget.value))}
          // v THIS COULD BE AN ISSUE v
          value={value}
        />
      </div>

      {/* PROPERTIES */}
      <div className="col-md-3" id="properties-container">
        <label htmlFor="input-property" className="form-label">
          Enter a property and press add:
        </label>
        <input
          type="text"
          id="input-property"
          name="input-property"
          className="form-control"
          onChange={(evt) => setProperty(evt.currentTarget.value)}
          value={property}
        />
        <button type="button" id="btn-addProperty" className="btn btn-success mt-1" onClick={addProperty}>
          add
        </button>
      </div>

      {/* PROPERTIES DISPLAY */}
      <div className="col-md-3" id="properties-list">
        <p>Properties:</p>
        <ul>
          {properties &&
            properties.map((prop) => (
              <li id={`property-${prop}`}>
                <p>
                  {prop + ' '}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(evt) => {
                      deleteProperty(prop);
                    }}
                  >
                    X
                  </button>
                </p>
              </li>
            ))}
        </ul>
      </div>

      {/* Uses radio input to set boolean */}
      <div className="col-md-3" id="inMartial-container">
        <div className="form-check">
          <p className="mb-0">Is the weapon martial?</p>

          <label htmlFor="radio-isMartial" className="form-check-label">
            Yes
          </label>
          <input
            type="radio"
            id="radio-isMartial"
            name="martial"
            className="form-check-input"
            onChange={(evt) => setIsMartial(evt.target.value)}
            value="true"
          />
          <br />

          <label htmlFor="radio-isSimple" className="form-check-label" checked="checked">
            No
          </label>
          <input
            type="radio"
            id="radio-isSimple"
            name="martial"
            className="form-check-input"
            onChange={(evt) => setIsMartial(evt.target.value)}
            value="false"
          />
        </div>
      </div>

      {/* Uses radio input to set boolean */}
      <div className="col-md-3" id="isRanged-container">
        <div className="form-check">
          <p className="mb-0">Is the weapon ranged?</p>

          <label htmlFor="radio-isRanged" className="form-check-label">
            Yes
          </label>
          <input
            type="radio"
            id="radio-isRanged"
            name="ranged"
            className="form-check-input"
            selected
            onChange={(evt) => setIsRanged(evt.target.value)}
            value="true"
          />
          <br />

          <label htmlFor="radio-isMelee" className="form-check-label">
            No
          </label>
          <input
            type="radio"
            id="radio-isMelee"
            name="ranged"
            className="form-check-input"
            onChange={(evt) => setIsRanged(evt.target.value)}
            value="false"
          />
        </div>
      </div>

      <div className="col-md-3" id="img-container">
        <label htmlFor="fileUpload" className="form-label">
          {invalidselectedFile && <span className="text-danger">*</span>}
          Weapon image:
        </label>
        <input type="file" name="file" id="fileUpload" onChange={imgUpdate} />
      </div>

      <div className="col-md-3" id="btn-container">
        <button id="btn-addWeapon" className="btn btn-success" onClick={save}>
          Save Weapon <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}

export default AddWeapon;
