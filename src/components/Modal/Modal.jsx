import React from 'react';
import './Modal.css';
import cerrar from '../../assets/images/remove.png'
import alerta from '../../assets/images/alert-circle.png'

export default function Modal({ closeModal, titulo, mensaje }) {
  return (
    <>
      <div className="box-modal" onClick={() => closeModal(false)}>
        <div className="contenedor-modal">
        <img className="cerrar" src={cerrar} alt="" />
          <div className="tenedor">
          <img className="alerta" src={alerta} alt="" />
            <p className="titulo-modal">{titulo}</p>
            <p className="mensaje-modal">{mensaje}</p>
            <button
              className="boton-modal"
              onClick={() => {
                closeModal(false);
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
