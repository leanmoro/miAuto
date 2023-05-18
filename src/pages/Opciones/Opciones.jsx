import React, { useState, useEffect } from 'react';
import './Opciones.css';
import sarah from '../../assets/images/AvatarSarah.png';
import PrevNext from '../../components/PrevNext/PrevNext';

export default function Opciones({
  optionsUser,
  setOptionsUser,
  dataCotizacion,
  setDataCotizacion,
  accidentes,
  autoRentado,
  activeStep,
  setActiveStep,
  cotizar,
  urldyn,
}) {
  const listaCheckBoxes = [
    { value: '250035', label: 'Aeroambulancia' },
    { value: '250029', label: 'Asistencia vial' },
    { value: '250062', label: 'Últimos gastos' },
    { value: '250042', label: 'Seguridad vial' },
    { value: '250089', label: 'Seguro de vida' },
  ];

  const [puedeCotizar, setPuedeCotizar] = useState(false);

  const [checked, setChecked] = useState([]);

  const [puedeAvanzar, setPuedeAvanzar] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep != 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleCotizar = () => {
    cotizar(urldyn, dataCotizacion);
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
      setOptionsUser({ ...optionsUser, [value]: checked });
      setDataCotizacion({ ...dataCotizacion, [value]: checked });
    } else {
      // remove unchecked value from the list
      setChecked((prev) => prev.filter((x) => x !== value));
      setOptionsUser({ ...optionsUser, [value]: checked });
      setDataCotizacion({ ...dataCotizacion, [value]: checked });
    }
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
            {listaCheckBoxes.map((item, index) => (
              <div className={`c-box ${index === 0 ? 'first-c-box' : ''}`} key={index}>
                <label className='labelchk'>
                  <span className={`span_chk ${isChecked(item.value)}`}>
                    {item.label}
                  </span>
                  {/* {item.label} */}
                  <div className="inner_chk">
                    <span className="chkdet">+ RD$ 2.000</span>
                    <input
                    className='box-chk'
                      value={item.value}
                      type="checkbox"
                      onChange={handleCheck}
                    />
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className="div-right">
            <div className="head-opc">Adicional</div>
            <p className="detalle">Aumenta el limite de tu cobertura</p>
            {/* { value: '250105', label: 'Responsabilidad Civil' }, */}
            <div className="c-box first-c-box">
                <label className='labelchk'>
                  <span className={`span_chk ${isChecked('250105')}`}>
                  Responsabilidad Civil
                  </span>
                  <div className="inner_chk">
                    <span className="chkdet">+ RD$ 2.000</span>
                    <input
                    className='box-chk'
                      value='250105'
                      type="checkbox"
                      onChange={handleCheck}
                    />
                  </div>
                </label>
                <span className='span-detail'>Aumentas el limite a $300.000</span>
              </div>
            
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
        puedeAvanzar={puedeAvanzar}
        puedeCotizar={puedeCotizar}
        handleCotizar={handleCotizar}
      />
    </React.Fragment>
  );
}
