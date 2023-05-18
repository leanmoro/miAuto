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
    { value: '250105', label: 'Responsabilidad Civil' },
  ];

  const [puedeCotizar, setPuedeCotizar] = useState(false);

  const [checked, setChecked] = useState([]);

  const [radioBtn, setRadioBtn] = useState('0');

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

  const onOptionChange = (e) => {
    setRadioBtn(e.target.value);
    setOptionsUser({ ...optionsUser, autoRentado: radioBtn });
    setDataCotizacion({ ...dataCotizacion, '250028': radioBtn });
  };

  return (
    <React.Fragment>
      <div className="contenedor">
        <img
          className="sarah"
          src={sarah}
          style={{ margin: '1rem 0' }}
          alt="Sarah"
        />
        <h1 className="titulo">
        ¡Estás a solo un paso de tener tu cotización!
        </h1>
        <p className="subtitulo-opciones">
          Selecciona las opciones que quieres incluir en tu plan
        </p>

        <div className="mainbox-opciones">
          <div className="div-one">
            {listaCheckBoxes.map((item, index) => (
              <div className={`c-box-${index}`} key={index}>
                <label>
                  <input
                    value={item.value}
                    type="checkbox"
                    onChange={handleCheck}
                  />
                  <span className={`span_chk ${isChecked(item.value)}`}>
                    {/* {item.label} */}
                  </span>
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          <div className="div-two">
            <label htmlFor="select-opciones">
              Accidentes personales conductor
            </label>
            <select
              defaultValue={'DEFAULT'}
              className="select-opciones"
              onChange={handleChangeAccidentes}
            >
              {/* <option value="DEFAULT" name="accidentes" id="accidentes">
                Accidentes personales conductor
              </option> */}

              {accidentes &&
                accidentes.map((accidente, index) => (
                  <option key={index} value={accidente.deIndiceDato}>
                    {accidente.deDato}
                  </option>
                ))}
            </select>
          </div>

          <div className="div-three">
            <p style={{ marginBottom: '1rem' }}>Auto rentado (días)</p>
            <div className="radios">
              <input
                type="radio"
                name="radioBtn"
                value="0"
                id="cero"
                checked={radioBtn === '0'}
                onChange={onOptionChange}
              />
              <label htmlFor="cero">0 días</label>

              <input
                type="radio"
                name="radioBtn"
                value="10"
                id="diez"
                checked={radioBtn === '10'}
                onChange={onOptionChange}
              />
              <label htmlFor="diez">10 días</label>

              <input
                type="radio"
                name="radioBtn"
                value="15"
                id="quince"
                checked={radioBtn === '15'}
                onChange={onOptionChange}
              />
              <label htmlFor="quince">15 días</label>

              <input
                type="radio"
                name="radioBtn"
                value="30"
                id="treinta"
                checked={radioBtn === '30'}
                onChange={onOptionChange}
              />
              <label htmlFor="diez">30 días</label>
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
