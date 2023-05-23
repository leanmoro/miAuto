import React from 'react';
import './Spinner.css';

export default function Spinner() {
  return (
    <React.Fragment>
      <div className="box-spinner">
        <div className="contenedor-spinner">
          <div className="spinner"></div>
          <div className="text-spinner">Estoy procesando tu solicitud, <br/> esto puede tardar unos segundos.</div>
        </div>
      </div>
    </React.Fragment>
  );
}
