import React from 'react';
import './BoxMarca.css'

const BoxMarca = ({ info, selected, onClick, sizeW, sizeH, borderR }) => {
  // console.log("info: ", info)
  console.log('selected: ', selected);
  return (
    <div
      className="boxMarca"
      style={{ width: sizeW, height: sizeH, borderRadius: borderR }}
    >
      <div
        className={`item ${selected ? 'selected' : ''}`}
        onClick={() => onClick(info)}
      >
        <img className="pic-marca" src={info.src} alt="" />
      </div>
    </div>
  );
};

export default BoxMarca;
