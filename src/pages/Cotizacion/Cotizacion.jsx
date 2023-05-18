import React from 'react';
import './Cotizacion.css'

export default function Cotizacion({ contratar, dataCotizacion, urldyn }) {

  return (
    <>
      <div className="contenedor-final">
        <div className="left">
          <p className="title">Cotización</p>
          <p className="intro">
            Mi Auto Básico ofrece cobertura de daños a terceros (pasajeros,
            conductor, propiedad de terceros, fianza), para vehículos sin
            restricción en edad de fabricación y de manera opcional pueden ser
            contratadas las coberturas de otros servicios.
          </p>
          <section className="subtitle1">
            <p className="subtitle">Cobertura</p>
            <pre>{JSON.stringify(dataCotizacion, null, 2)}</pre>
          </section>
          <section className="subtitle1">
            <p className="subtitle">Coberturas opcionales</p>
            <ul>
              <li>Lesiones corporales y/o muerte a un tercero. </li>
              <li>Lesiones corporales y/o muerte a más de un tercero </li>
              <li>Daños a la propiedad de terceros. </li>
              <li>Lesiones corporales y/o muerte a un pasajero.</li>
              <li>Lesiones corporales y/o muerte a más de un pasajero.</li>
              <li>Accidentes personales conductor.</li>
              <li>Gastos médicos al conductor.</li>
              <li>Fianza judicial.</li>
              <li>Defensa legal.</li>
            </ul>
          </section>
        </div>

        <div className="right">
          <p className="title">Resumen</p>
          <div className="details">
            <ul>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
            </ul>
          </div>
          <div className="total">
            <div>Total</div>
            <div>$ 1.000,00</div>
          </div>
          <button
            className="btn-contratar"
              // onClick={()=>contratar(urldyn, dataCotizacion)}
          >
            Contratar
          </button>
          <button
            className="btn-cancelar"
            onClick={() => {
              window.location.href = 'https://mcstaging.humano.com.do/';
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
