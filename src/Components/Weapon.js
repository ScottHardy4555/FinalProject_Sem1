/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faMagicWandSparkles, faHand} from '@fortawesome/free-solid-svg-icons';
import './Weapon.css';

function Weapon(props) {
  // Translates a weapon's properties property into a readable string
  function buildPropertyList(properties) {
    let temp = 'Properties: ';
    if (properties.length !== 0) {
      properties.forEach((property) => {
        temp += `${property}, `;
      });
      temp = temp.substring(0, temp.length - 2);
    } else temp += 'none';
    return temp;
  }

  const [name, setName] = useState('');
  const [die_num, setDie_num] = useState(1);
  const [die_type, setDie_type] = useState('');
  const [dmg_type, setDmg_type] = useState('');
  const [weight, setWeight] = useState(0);
  const [value, setValue] = useState(0);
  const [properties, setProperties] = useState('');
  // const [isMartial, setIsMartial] = useState('false');
  // const [isRanged, setIsRanged] = useState('false');
  // const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setName(props.weapon.name);
    setDie_num(props.weapon.die_num);
    setDie_type(props.weapon.die_type);
    setDmg_type(props.weapon.dmg_type);
    setWeight(props.weapon.weight);
    setValue(props.weapon.value);
    setProperties(props.weapon.properties);
    // setIsMartial(props.weapon.isMartial);
    // setIsRanged(props.weapon.isRanged);
    // setSelectedFile(props.weapon.selectedFile);
  }, []);

  function saveWeapon() {
    setEditMode(false);
    console.log(name);
    const updatedWeapon = {
      id: props.weapon.id,
      name: name,
      die_num: die_num,
      die_type: die_type,
      dmg_type: dmg_type,
      weight: weight,
      value: value,
      properties: properties,
      isMartial: props.weapon.isMartial,
      isRanged: props.weapon.isRanged,
      selectedFile: props.weapon.selectedFile,
    };
    props.updateWeapon(updatedWeapon);
  }

  const [editMode, setEditMode] = useState(false);

  const [property, setProperty] = useState('');
  function addProperty() {
    if (property) setProperties([...properties, property]);
    setProperty('');
  }

  function deleteProperty(deleteProp) {
    setProperties(properties.filter((prop) => prop !== deleteProp));
  }

  return (
    <div className="card p-0">
      <div className="card bg-primary">
        <img src={props.weapon.image} alt={props.weapon.name} className="p-2" />
        <div className="card-body">
          {!editMode && (
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-center">{props.weapon.name}</li>
              <li className="list-group-item">
                {props.weapon.die_num}d{props.weapon.die_type} {props.weapon.dmg_type} damage
              </li>
              <li className="list-group-item">{buildPropertyList(props.weapon.properties)}</li>
              <li className="list-group-item">Weight: {props.weapon.weight} lb</li>
              <li className="list-group-item">{props.weapon.value} gp</li>
              {!props.equipped && (
                <div>
                  <button
                    type="button"
                    className="btn btn-success w-100"
                    onClick={() => props.updateEquipped(props.weapon)}
                  >
                    Equip <FontAwesomeIcon icon={faHand}></FontAwesomeIcon>
                  </button>

                  <button type="button" className="btn btn-warning w-100" onClick={() => setEditMode(true)}>
                    Edit <FontAwesomeIcon icon={faMagicWandSparkles}></FontAwesomeIcon>
                  </button>
                  <button
                    type="button"
                    id="weaponDelete"
                    className="btn btn-danger w-100"
                    onClick={() => props.removeWeapon(props.weapon)}
                  >
                    Delete Weapon <FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>
                  </button>
                </div>
              )}
            </ul>
          )}
          {editMode && (
            <ul className="list-group list-group-flush">
              {/* NAME */}
              <li className="list-group-item text-center">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(evt) => setName(evt.currentTarget.value)}
                />
              </li>
              {/* DAMAGE */}
              <li className="list-group-item">
                <input
                  type="text"
                  id="input-die_num"
                  name="input-die_num"
                  className="form-control w-25 d-inline"
                  onChange={(evt) => setDie_num(parseInt(evt.currentTarget.value))}
                  value={die_num}
                />
                d
                <select
                  name="input-die_type"
                  id="input-die_type"
                  className="form-select w-50 d-inline"
                  value={die_type}
                  onChange={(evt) => setDie_type(parseInt(evt.currentTarget.value))}
                >
                  <option selected disabled>
                    Choose a die...
                  </option>
                  <option value="1">d1</option>
                  <option value="4">d4</option>
                  <option value="6">d6</option>
                  <option value="8">d8</option>
                  <option value="10">d10</option>
                  <option value="12">d12</option>
                  <option value="20">d20</option>
                </select>{' '}
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
                </datalist>{' '}
                damage
              </li>
              {/* PROPERTIES */}
              <li className="list-group-item">
                Properties:{' '}
                <ul>
                  {properties &&
                    properties.map((prop) => (
                      <li id={`property-${prop}`}>
                        <p>
                          {prop + ' '}
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              deleteProperty(prop);
                            }}
                          >
                            X
                          </button>
                        </p>
                      </li>
                    ))}
                </ul>
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
              </li>
              {/* WEIGHT */}
              <li className="list-group-item">
                <input
                  type="number"
                  id="input-weight"
                  name="input-weight"
                  className="form-control w-50 d-inline"
                  onChange={(evt) => setWeight(parseInt(evt.currentTarget.value))}
                  value={weight}
                />{' '}
                lbs
              </li>
              {/* VALUE */}
              <li className="list-group-item">
                <input
                  type="number"
                  id="input-value"
                  name="input-value"
                  className="form-control w-50 d-inline"
                  onChange={(evt) => setValue(parseInt(evt.currentTarget.value))}
                  // v THIS COULD BE AN ISSUE v
                  value={value}
                />{' '}
                gp
              </li>
              {/* BUTTON */}
              <li className="list-group-item">
                <button type="button" id="btnSave" className="btn btn-secondary" onClick={saveWeapon}>
                  Save
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weapon;
