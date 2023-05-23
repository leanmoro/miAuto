import React, { useEffect, useState } from 'react';
import './Usos.css';
import Litbox from '../../components/LitBox/Litbox';
import Modal from '../../components/Modal/Modal';
import PrevNext from '../../components/PrevNext/PrevNext';
import sarah from '../../assets/images/AvatarSarah.png';
import lock from '../../assets/images/square-lock-1.png';
import lock_chk from '../../assets/images/square-lock.png';
import unlock from '../../assets/images/taxi-1.png';
import unlock_chk from '../../assets/images/taxi.png';

export default function Usos({
  optionsUser,
  setOptionsUser,
  dataCotizacion,
  setDataCotizacion,
  activeStep,
  setActiveStep,
  anios,
  antiguedad,
  setAntiguedad,
}) {

  const [puedeAvanzar, setPuedeAvanzar] = useState(false);

  const usos = [
    {
      id: 4,
      title: 'Privado',
      src: lock,
      checked: lock_chk,
    },
    {
      id: 5,
      title: 'Comercial',
      src: unlock,
      checked: unlock_chk,
    },
  ];

  const tiposCombustible = [
    {
      id: 100,
      title: 'Gasolina',
    },
    {
      id: 101,
      title: 'Eléctrico',
    },
    {
      id: 102,
      title: 'Gas',
    },
  ];

  const [showPublicModal, setShowPublicModal] = useState(false);
  const [showGasModal, setShowGasModal] = useState(false);

  const [checked, setChecked] = useState(false);

  const [selectedItem, setSelectedItem] = useState(optionsUser);

  const modal2 = true;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep != 0) {
      setActiveStep(activeStep - 1);
    }
  };

  useEffect(() => {
    if (optionsUser.uso === 'Privado' && optionsUser.anio) {
      console.log('dentro del if optionsUser uso(anio) = ', optionsUser.uso);
      setPuedeAvanzar(true);
    } else {
      setPuedeAvanzar(false);
    }
  }, [optionsUser.anio, optionsUser.uso]);

  const handleCombustible = (e) => {
    const selCombustible = e.target.value;
    if (selCombustible === 'Gas') {
      setOptionsUser({ ...optionsUser, equipoGas: true });
      setDataCotizacion({ ...dataCotizacion, '250104': true });
      setShowGasModal(true);
    }
  };

  const handleItemClick = (uso) => {
    setSelectedItem(uso);
    setOptionsUser({ ...optionsUser, uso: uso.title });
    setDataCotizacion({ ...dataCotizacion, '250015': uso.id });
    if (uso.title === 'Comercial') {
      setShowPublicModal(true);
    }
  };

  const handleChangeAnio = (e) => {
    const selAnio = e.target.value;
    console.log('anio user previo = ', optionsUser.anio);
    setOptionsUser({ ...optionsUser, anio: selAnio });
    console.log('anio user actualizado = ', optionsUser.anio);
    setDataCotizacion({ ...dataCotizacion, '250003': selAnio });
  };

  useEffect(() => {
    const anioActual = new Date().getFullYear();
    setAntiguedad(anioActual - optionsUser.anio);
  }, [optionsUser.anio]);

  useEffect(() => {
    console.log('antiguedad = ', antiguedad);
  }, [antiguedad]);

  useEffect(() => {
    if (optionsUser.uso === 'Privado') {
      setSelectedItem(optionsUser);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="contenedor-usos">
        {showPublicModal && (
          <Modal
            sizeW={'700px'}
            textoModal1={'Ver canales de atención'}
            modal2={modal2}
            closeModal={() => setShowPublicModal(false)}
            titulo="¡Ups!"
            mensaje="Tu vehículo no es de uso privado por lo que no podemos ofrecerte Cobertura por esta vía. Te esperamos en tu sucursal Humano más cercana para poder asistirte con la mejor cobertura."
          />
        )}

        {showGasModal && (
          <Modal
            sizeW={'700px'}
            textoModal1={'Ver sucursales'}
            modal2={modal2}
            closeModal={() => setShowGasModal(false)}
            titulo="¡Queremos ayudarte a que obtengas la mejor cobertura!"
            mensaje="Pasa por tu sucursal Humano más cercana para realizar una inspección presencial de tu vehículo de gas o asegúralo con Mi Auto Básico."
          />
        )}

        <img className="sarah" src={sarah} alt="Sarah" />
        <h1 className="titulo">¿Qué tipo de uso le das?</h1>

        <div className="mainbox-split">
          <div className="split-left">
            <div className="main">
              {usos.map((uso) => (
                <Litbox
                  key={uso.id}
                  info={uso}
                  selected={optionsUser && optionsUser.uso === uso.title}
                  sizeW={'160px'}
                  sizeH={'185px'}
                  borderR={'10%'}
                  onClick={handleItemClick}
                />
              ))}
            </div>

            <div className="main-anio">
              <select
                defaultValue={'DEFAULT'}
                className="select-usos"
                onChange={handleCombustible}
              >
                <option
                  value="DEFAULT"
                  disabled
                  name="combustible"
                  id="comustible"
                >
                  Tipo de combustible
                </option>

                {tiposCombustible?.map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>

              <select
                defaultValue={'DEFAULT'}
                className="select-usos"
                onChange={handleChangeAnio}
              >
                <option value="DEFAULT" disabled name="año" id="año">
                  Año
                </option>

                {anios?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="split-right"></div>
        </div>
      </div>
      <PrevNext
        handleNext={handleNext}
        handleBack={handleBack}
        puedeAvanzar={puedeAvanzar}
      />
    </React.Fragment>
  );
}
