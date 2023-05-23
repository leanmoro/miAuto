import React, { useState } from 'react';
import './Cotizacion.css';
import Spinner from '../../components/Spinner/Spinner';
import Opcionales from '../../components/Opcionales/Opcionales';
import MiAutoService from '../../services/MiAutoService';
import Adicionales from '../../components/Adicionales/Adicionales';

export default function Cotizacion({
  optionsUser,
  setOptionsUser,
  dataCotizacion,
  setDataCotizacion,
  urldyn,
  valorCoti,
  setValorCoti,
}) {
  const [checked, setChecked] = useState([]);

  const cotizar = async (url, dataCotizacion) => {
    const res = await MiAutoService.cotizar(url, dataCotizacion);
    setValorCoti(res);
  };

  // Add/Remove checked item from list
  const handleCheck = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // push selected value in list
      setChecked((prev) => [...prev, value]);
    } else {
      // remove unchecked value from the list
      setChecked((prev) => prev.filter((x) => x !== value));
    }
    setOptionsUser({ ...optionsUser, [value]: checked });
    setDataCotizacion({ ...dataCotizacion, [value]: checked });
    cotizar(urldyn, dataCotizacion);
  };

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? 'checked-item' : 'not-checked-item';

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
            {/* <pre>{JSON.stringify(dataCotizacion, null, 2)}</pre> */}
          </section>
          <section className="subtitle1">
            <p className="subtitle">Opcionales</p>
            <Opcionales
              handleCheck={handleCheck}
              isChecked={isChecked}
              dataCotizacion={dataCotizacion}
            />
          </section>
          <section className="subtitle1">
            <p className="subtitle">Adicionales</p>
            <Adicionales
              handleCheck={handleCheck}
              isChecked={isChecked}
              dataCotizacion={dataCotizacion}
            />
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
            <div>$ {valorCoti ? valorCoti : <Spinner />}</div>
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
