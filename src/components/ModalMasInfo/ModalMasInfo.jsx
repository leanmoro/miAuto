import React from 'react';
import './ModalMasInfo.css';
import cerrar from '../../assets/images/remove.png';
import auto from '../../assets/images/MiAuto-2.png';
import icond from '../../assets/images/download.png';

export default function Modal({ closeModal, titulo, mensaje }) {
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
              <div className="item-desc">Cobertura</div>
              <div className="item-precio">Límites</div>
              <div className="item-desc">Cobertura</div>
              <div className="item-precio">Límites</div>
              <div className="item-desc">Cobertura</div>
              <div className="item-precio">Límites</div>
              <div className="item-desc">Cobertura</div>
              <div className="item-precio">Límites</div>
              <div className="item-desc">Cobertura</div>
              <div className="item-precio">Límites</div>
              <div className="item-desc">Cobertura</div>
              <div className="item-precio">Límites</div>
              <div className="item-desc">Cobertura</div>
              <div className="item-precio">Límites</div>
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
