import React, { useEffect } from 'react';
import './ModalMasInfo.css';
import cerrar from '../../assets/images/remove.png';
import auto from '../../assets/images/MiAuto-2.png';
import icond from '../../assets/images/download.png';

export default function Modal({ closeModal, titulo, coberturas }) {
  useEffect(() => {
    console.log('Coberturas state = ', coberturas);
  }, [coberturas]);

  return (
    <>
      <div className="box-modal" onClick={() => closeModal(false)}>
        <div className="contenedor-modal">
          <img className="cerrar" src={cerrar} alt="" />
          <div className="wrapper-masinfo">
            <img className="auto" src={auto} alt="" />
            <p className="titulo-masinfo">{titulo}</p>
            <div className="cobertura-limites">
              <div className="cobertura">Cobertura</div>
              <div className="limites">Límites</div>
            </div>
            <div className="info-cobertura">
              {coberturas.map((item) => (
                <React.Fragment key={item.id}>
                  <div className="item-desc" s>{item.garantiaDescripcion}</div>
                  <div className="item-precio">
                    {item.garantiaLimiteDescripcion}
                  </div>
                </React.Fragment>
              ))}
            </div>
            <button
              className="boton-descargar"
              onClick={() => {
                closeModal(false);
              }}
            >
              <img className="iconD" src={icond} alt="" />
              Descargar brochure
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
