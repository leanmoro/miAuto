import React, { useState } from 'react';
import './CardPlan.css';
import checked from '../../assets/images/Checkmark.png';
import tilden from '../../assets/images/tilde-n.png';
import tildew from '../../assets/images/tilde-w.png';
import Modal from '../../components/ModalMasInfo/ModalMasInfo';

const Card = ({ info, selected, onClick, sizeW, sizeH, borderR, best }) => {
  const [showMasInfoModal, setShowMasInfoModal] = useState(false);

  const handleMasInfo = (info) => {
    setShowMasInfoModal(true);
    // if (info.title === 'Comercial') {
    //   setShowMasInfoModal(true);
    // }
  };

  return (
    <>
      {showMasInfoModal && (
        <Modal
          closeModal={() => setShowMasInfoModal(false)}
          titulo={'Mi Auto ' + info.title}
          mensaje="Tu vehículo no es de uso privado por lo que no podemos ofrecerte Cobertura por esta vía. Te esperamos en tu sucursal Humano más cercana para poder asistirte con la mejor cobertura."
        />
      )}
      {best ? (
        <div className='bestup'>
          <div className="bestvalue">Mejor opción</div>
          <div
            className={`card-upselling ${selected ? 'selected' : ''}`}
            onClick={() => onClick(info)}
            style={{ width: sizeW, height: sizeH, borderRadius: "0px 0px 24px 24px" }}
          >
            {/* {best && <div className="bestvalue">Mejor opción</div>} */}
            {selected && <img className="check-icon" src={checked} />}
            <p className="card-title">{info.title}</p>
            <p className="card-subtitle">{info.subtitle}</p>
            <ul className="card-bullets">
              {info.bullets.map((bullet) => (
                <li key={bullet.id}>
                  {selected ? <img src={tildew} /> : <img src={tilden} />}
                  {bullet.value}
                </li>
              ))}
            </ul>

            {/* <button className="card-button">Lo quiero</button> */}

            <p className="masInfo" onClick={handleMasInfo}>
              Más información
            </p>
          </div>
        </div>
      ) : (
        <div
          className={`card-upselling ${selected ? 'selected' : ''}`}
          onClick={() => onClick(info)}
          style={{ width: sizeW, height: sizeH, borderRadius: borderR }}
        >
          {/* {best && <div className="bestvalue">Mejor opción</div>} */}
          {selected && <img className="check-icon" src={checked} />}
          <p className="card-title">{info.title}</p>
          <p className="card-subtitle">{info.subtitle}</p>
          <ul className="card-bullets">
            {info.bullets.map((bullet) => (
              <li key={bullet.id}>
                {selected ? <img src={tildew} /> : <img src={tilden} />}
                {bullet.value}
              </li>
            ))}
          </ul>

          {/* <button className="card-button">Lo quiero</button> */}

          <p className="masInfo" onClick={handleMasInfo}>
            Más información
          </p>
        </div>
      )}
    </>
  );
};

export default Card;
