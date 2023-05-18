import React, { useState, useEffect } from 'react';
import './SearchBar.css';

import { FaSearch } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

export default function SearchBar({
  marcas,
  optionsUser,
  setOptionsUser,
  dataCotizacion,
  setDataCotizacion,
}) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');
  const [isShown, setIsShown] = useState(true);
  const [isBrandDeleted, setIsBrandDeleted] = useState(false);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = marcas.marcas.filter((value) => {
      return value.descripcionMarca
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  // useEffect(() => {
  //   const newFilter = marcas.marcas.filter((value) => {
  //     return value.descripcionMarca.toLowerCase().includes(wordEntered.toLowerCase());
  //   });
  //   setFilteredData(newFilter);
  // }, [wordEntered, marcas.marcas, isBrandDeleted]);

  // const handleFilter = (e) => {
  //   const searchWord = e.target.value;
  //   setWordEntered(searchWord);
  //   if (searchWord === '') {
  //     setFilteredData([]);
  //   }
  // };

  const handleChangeMarca = (value) => {
    console.log('handleChangeMarca: ', value);
    setOptionsUser((prevState) => ({ ...prevState, idMarca: value.idMarca }));
    setWordEntered(value.descripcionMarca);
    setIsShown(false);
    setIsBrandDeleted(true);
  };

  const handleClear = () => {
    setOptionsUser((prevState) => ({ ...prevState, idMarca: null }));
    setWordEntered('');
    setIsShown(true);
  };

  return (
    <>
      <div className="search">
        <div className="input-wrapper">
          <div className="searchIcon">
            {filteredData.length === 0 && <FaSearch id="search-icon" />}
          </div>

          <input
            type="search"
            id="search"
            placeholder="Marca"
            value={wordEntered}
            onChange={handleFilter}
          />
          {/* {optionsUser.idMarca && (
            <button className="clearButton" onClick={handleClear}>
              CLICK
            </button>
          )} */}
          {filteredData.length !== 0 && (
            <AiFillDelete
              className="clearSearchBtn"
              onClick={handleClear}
            />
          )}
        </div>
        {filteredData.length !== 0 && isShown && (
          <div className="dataResult">
            {filteredData.slice(0, 5).map((value, key) => {
              return (
                <div
                  key={value.idMarca}
                  className="dataItem"
                  onClick={() => {
                    handleChangeMarca(value);
                    setIsShown(false);
                  }}
                >
                  <p>{value.descripcionMarca}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
