/* eslint-disable react-hooks/exhaustive-deps */

// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import AddWeapon from './AddWeapon';
import Weapon from './Weapon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

function App() {
  const [allWeapons, setAllWeapons] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [searchDie, setSearchDie] = useState('');

  // Seed Data
  const weapons = [
    {
      id: nanoid(),
      name: 'Dagger',
      die_type: 4,
      die_num: 1,
      dmg_type: 'piercing',
      weight: 1,
      value: 2,
      properties: ['light', 'finesse', 'thrown'],
      isMartial: false,
      isRanged: false,
      image: 'images/dagger.jpg',
    },
    {
      id: nanoid(),
      name: 'Spear',
      die_type: 6,
      die_num: 1,
      dmg_type: 'piercing',
      weight: 3,
      value: 1,
      properties: ['thrown', 'versatile'],
      isMartial: false,
      isRanged: false,
      image: 'images/spear.jpg',
    },
    {
      id: nanoid(),
      name: 'Light Crossbow',
      die_type: 8,
      die_num: 1,
      dmg_type: 'piercing',
      weight: 5,
      value: 25,
      properties: ['ammunition', 'loading', 'two-handed'],
      isMartial: false,
      isRanged: true,
      image: 'images/lightCrossbow.jpg',
    },
    {
      id: nanoid(),
      name: 'Shortbow',
      die_type: 6,
      die_num: 1,
      dmg_type: 'piercing',
      weight: 2,
      value: 25,
      properties: ['ammunition', 'two-handed'],
      isMartial: false,
      isRanged: true,
      image: 'images/shortbow.jpg',
    },
    {
      id: nanoid(),
      name: 'Mace',
      die_type: 6,
      die_num: 1,
      dmg_type: 'bludgeoning',
      weight: 4,
      value: 5,
      properties: [],
      isMartial: false,
      isRanged: false,
      image: 'images/mace.jpg',
    },
    {
      id: nanoid(),
      name: 'Longsword',
      die_type: 8,
      die_num: 1,
      dmg_type: 'slashing',
      weight: 3,
      value: 15,
      properties: ['versatile'],
      isMartial: true,
      isRanged: false,
      image: 'images/longsword.jpg',
    },
    {
      id: nanoid(),
      name: 'Greatsword',
      die_type: 6,
      die_num: 2,
      dmg_type: 'slashing',
      weight: 6,
      value: 50,
      properties: ['two-handed', 'heavy'],
      isMartial: true,
      isRanged: false,
      image: 'images/greatsword.jpg',
    },
    {
      id: nanoid(),
      name: 'Rapier',
      die_type: 8,
      die_num: 1,
      dmg_type: 'piercing',
      weight: 2,
      value: 25,
      properties: ['finesse'],
      isMartial: true,
      isRanged: false,
      image: 'images/rapier.jpg',
    },
    {
      id: nanoid(),
      name: 'Longbow',
      die_type: 8,
      die_num: 1,
      dmg_type: 'piercing',
      weight: 2,
      value: 50,
      properties: ['ammunition', 'heavy', 'two-handed'],
      isMartial: true,
      isRanged: false,
      image: 'images/longbow.jpg',
    },
    {
      id: nanoid(),
      name: 'Greataxe',
      die_type: 12,
      die_num: 1,
      dmg_type: 'slashing',
      weight: 7,
      value: 30,
      properties: ['heavy', 'two-handed'],
      isMartial: true,
      isRanged: false,
      image: 'images/greataxe.jpg',
    },
  ];

  useEffect(() => {
    if (localStorage) {
      const weaponsLocalStorage = JSON.parse(localStorage.getItem('weapons'));

      if (weaponsLocalStorage) {
        saveWeapons(weaponsLocalStorage);
      } else if (weaponsLocalStorage.length === 0) saveWeapons(weapons);
    } else {
      saveWeapons(weapons);
    }
  }, []);

  function saveWeapons(weapons) {
    setAllWeapons(weapons);
    setSearchResults(weapons);
    if (localStorage) {
      localStorage.setItem('weapons', JSON.stringify(weapons));
      console.log('saved to local storage');
    }
  }

  function searchWeapons() {
    let keywordArray = [];

    if (keywords) {
      keywordArray = keywords.toLowerCase().split(' ');
    }

    // if (searchDie) {
    //   keywordArray.push(searchDie.toString());
    // }

    if (keywordArray.length > 0 || searchDie) {
      const searchResults = allWeapons.filter((weapon) => {
        let nameBool = keywordArray.length > 0 ? false : true;
        let dieBool = searchDie ? false : true;
        // let nameBool = false;
        // let dieBool = false;

        for (const word of keywordArray) {
          if (weapon.name.toLowerCase().includes(word) || weapon.die_type === parseInt(word)) {
            nameBool = true;
          }
        }
        if (searchDie) {
          if (searchDie === weapon.die_type) {
            dieBool = true;
          }
        }

        if (nameBool && dieBool) return true;
        return false;
      });
      setSearchResults(searchResults);
    } else setSearchResults(allWeapons);
  }

  function removeWeapon(weaponToDelete) {
    const updatedWeaponsArray = allWeapons.filter((weapon) => weapon.id !== weaponToDelete.id);
    saveWeapons(updatedWeaponsArray);
  }

  function updateWeapon(updatedWeapon) {
    const updatedWeaponsArray = allWeapons.map((weapon) =>
      weapon.id === updatedWeapon.id ? { ...weapon, ...updatedWeapon } : weapon
    );
    saveWeapons(updatedWeaponsArray);
  }

  const addWeapon = (newWeapon) => {
    saveWeapons([...allWeapons, newWeapon]);
  };

  // JSX stapler
  return (
    <div className="container my-5">
      <div className="row" id="allWeapons">
        <h3>Current Weapons</h3>
        {/* Fills out weapon cards for display */}
        {searchResults &&
          searchResults.map((weapon) => (
            <div className="col-md-3 mt-2" key={weapon.id}>
              <Weapon weapon={weapon} removeWeapon={removeWeapon} updateWeapon={updateWeapon} />
            </div>
          ))}
      </div>
      {/* Button to construct weapon list DEPRECIATED */}
      {/* {!allWeapons && (
        <button type="button" className="btn btn-success btn-lg mt-2" onClick={() => saveWeapons(weapons)}>
          Save Weapons
        </button>
      )} */}

      <AddWeapon addWeapon={addWeapon} />

      <div className="row mt-4" id="searchWeapon">
        <h3>Search Weapon</h3>
        <div className="col-md-4">
          <label htmlFor="txtKeywords" className="form-label">
            Search by Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Dagger"
            onChange={(evt) => setKeywords(evt.currentTarget.value)}
            value={keywords}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="selectDie" className="form-label">
            Select a die type
          </label>
          <select
            name="selectDie"
            id="selectDie"
            className="form-select"
            value={searchDie}
            onChange={(evt) => setSearchDie(parseInt(evt.currentTarget.value))}
          >
            <option value="">Select Die...</option>
            {_(allWeapons)
              .map((weapon) => weapon.die_type)
              .sort()
              .uniq()
              .map((die_type) => (
                <option key={die_type} value={die_type}>
                  d{die_type}
                </option>
              ))
              .value()}
          </select>
        </div>
        <div className="col-md-4">
          <button type="button" className="btn btn-primary" onClick={searchWeapons}>
            Search Weapons <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
