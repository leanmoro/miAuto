import React from 'react';
import './Modal.css';
import cerrar from '../../assets/images/remove.png';
import alerta from '../../assets/images/alert-circle.png';

export default function Modal({
  closeModal,
  titulo,
  mensaje,
  sizeW,
  textoModal1,
  modal2,
}) {
  return (
    <>
      <div className="box-modal" onClick={() => closeModal(false)}>
        <div
          className="contenedor-modal"
          style={{ width: sizeW }}
        >
          <img className="cerrar" src={cerrar} alt="" />
          <div className="tenedor">
            <img className="alerta" src={alerta} alt="" />
            <p className="titulo-modal">{titulo}</p>
            <p className="mensaje-modal">{mensaje}</p>
            <button
              className="boton-modal-1"
              onClick={() => {
                closeModal(false);
              }}
            >
              {textoModal1}
            </button>
            {modal2 && (
              <button
                className="boton-modal-2"
                onClick={() => {
                  closeModal(false);
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
