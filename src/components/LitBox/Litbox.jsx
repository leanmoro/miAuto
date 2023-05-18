import React from 'react';
import './Litbox.css';
import checked from '../../assets/images/Checkmark.png';

const Litbox = ({ info, selected, onClick, sizeW, sizeH, borderR }) => {
  return (
    <div
      className={`litbox item ${selected ? 'selected' : ''}`}
      onClick={() => onClick(info)}
      style={{ width: sizeW, height: sizeH, borderRadius: borderR }}
    >
      {selected && <img className="check-icon" src={checked} />}
      <div className="img-center">
        {selected ? (
          <img className="pic" src={info.checked} />
        ) : (
          <img className="pic" src={info.src} alt="" />
        )}
        {selected
          ? info.title && (
              <p style={{ color: '#FFFFFF'}}>{info.title}</p>
            )
          : info.title && <p style={{ color: '#5F5F62' }}>{info.title}</p>}
      </div>
    </div>
  );
};

export default Litbox;
