import React, { useState, useEffect } from 'react';
import './Opciones.css';
import sarah from '../../assets/images/AvatarSarah.png';
import PrevNext from '../../components/PrevNext/PrevNext';
import Opcionales from '../../components/Opcionales/Opcionales';
import Adicionales from '../../components/Adicionales/Adicionales';

export default function Opciones({
  optionsUser,
  setOptionsUser,
  dataCotizacion,
  setDataCotizacion,
  accidentes,
  autoRentado,
  activeStep,
  setActiveStep,
  preparar,
  urldyn,
}) {
  const [puedeCotizar, setPuedeCotizar] = useState(false);

  const [puedeAvanzar, setPuedeAvanzar] = useState(false);

  const [checked, setChecked] = useState([]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep != 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handlePreparar = () => {
    preparar(urldyn, dataCotizacion);
    setActiveStep(activeStep + 1);
  };

  // useEffect(() => {
  //   if (optionsUser.version) {
  //     setPuedeAvanzar(true);
  //   } else {
  //     setPuedeAvanzar(false);
  //   }
  // }, [optionsUser.version]);

  useEffect(() => {
    setPuedeAvanzar(true);
    setPuedeCotizar(true);
  }, []);

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
  };

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? 'checked-item' : 'not-checked-item';

  const handleChangeAccidentes = (e) => {
    const selAcc = e.target.value;
    setOptionsUser({ ...optionsUser, accidentes: selAcc });
    setDataCotizacion({ ...dataCotizacion, '250024': selAcc });
  };

  const handleChangeRentado = (e) => {
    const selRent = e.target.value;
    setOptionsUser({ ...optionsUser, autoRentado: selRent });
    setDataCotizacion({ ...dataCotizacion, '250028': selRent });
  };

  return (
    <React.Fragment>
      <div className="contenedor" style={{ flex: 1 }}>
        <img
          className="sarah"
          src={sarah}
          style={{ margin: '1rem 0' }}
          alt="Sarah"
        />
        <div>
          <h1 className="titulo">
            ¡Estás a solo un paso de tener tu cotización!
          </h1>
          <p className="subtitulo-opciones">
            Selecciona las opciones que quieres incluir en tu plan
          </p>
        </div>

        <div className="mainbox-opciones">
          <div className="div-left">
            <div className="head-opc">Opcional</div>
            <p className="detalle">
              Selecciona coberturas opcionales que quieras añadir
            </p>
            <Opcionales
              handleCheck={handleCheck}
              isChecked={isChecked}
              dataCotizacion={dataCotizacion}
            />
          </div>
          <div className="div-right">
            <div className="head-opc">Adicional</div>
            <p className="detalle">Aumenta el limite de tu cobertura</p>
            <Adicionales
              handleCheck={handleCheck}
              isChecked={isChecked}
              dataCotizacion={dataCotizacion}
            />

            <div className="select accidentes">
              <label htmlFor="select-opciones">
                Accidentes personales conductor
              </label>
              <select
                defaultValue={'DEFAULT'}
                className="select-opciones"
                onChange={handleChangeAccidentes}
              >
                {accidentes &&
                  accidentes.map((accidente, index) => (
                    <option key={index} value={accidente.deIndiceDato}>
                      {accidente.deDato}
                    </option>
                  ))}
              </select>
            </div>

            <div className="select rentado">
              <label htmlFor="select-opciones">Auto rentado (días)</label>
              <select
                defaultValue={'DEFAULT'}
                className="select-opciones"
                onChange={handleChangeRentado}
              >
                {autoRentado &&
                  autoRentado.map((renta, index) => (
                    <option key={index} value={renta.deIndiceDato}>
                      {renta.deDato}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <PrevNext
        handleNext={handleNext}
        handleBack={handleBack}
        puedeCotizar={puedeCotizar}
        puedeAvanzar={puedeAvanzar}
        handlePreparar={handlePreparar}
      />
    </React.Fragment>
  );
}
