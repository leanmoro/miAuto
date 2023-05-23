import React, { useState, useEffect } from 'react';
import './index.css';

import Nav from '../components/NavBar/NavBar';

import Vehiculos from '../pages/Vehiculos/Vehiculos';
import Usos from '../pages/Usos/Usos';
import Planes from '../pages/Planes/Planes';
import Marcas from '../pages/Marcas/Marcas';
import Opciones from '../pages/Opciones/Opciones';
import Cotizacion from '../pages/Cotizacion/Cotizacion';

import MiAutoService from '../services/MiAutoService';

export default function Formulario() {
  const [optionsUser, setOptionsUser] = useState({
    vehiculo: '',
    valorVehiculo: '',
    uso: '',
    equipoGas: false,
    anio: '',
    plan: '',
    idMarca: '',
    idModelo: '',
    marcaModeloVersion: '',
    casaCarcel: '',
    fianza: '',
    zonaCirculacion: '',
    accidentes: '',
    aeroAmbulancia: false,
    asistenciaVial: false,
    ultimosGastos: false,
    seguridadVial: false,
    seguroVida: false,
    responsabilidad: false,
    autoRentado: '',
  });

  const [dataCotizacion, setDataCotizacion] = useState({
    '250015': '',
    '250016': '',
    '250104': false,
    '250003': '',
    '250041': '',
    '250000': '',
    '250001': '',
    '250004': '',
    '250027': '',
    '250026': '',
    '250323': '',
    '250024': '',
    '250035': false,
    '250029': false,
    '250062': false,
    '250042': false,
    '250089': false,
    '250105': false,
    '250028': '0',
  });

  const [urldyn, setUrldyn] = useState('');
  const [anios, setAnios] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [versiones, setVersiones] = useState([]);
  const [casaCarcel, setCasaCarcel] = useState([]);
  const [fianza, setFianza] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [accidentes, setAccidentes] = useState([]);
  const [autoRentado, setAutoRentado] = useState([]);
  const [antiguedad, setAntiguedad] = useState(null);
  const [valorCoti, setValorCoti] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const url = await MiAutoService.fetchUrl();
      setUrldyn(url);
    }
    fetchData();
  }, []);

  const preparar = async (url, dataCotizacion) => {
    const res = await MiAutoService.prepararCotizacion(url, dataCotizacion);
    setValorCoti(res);
  };

  useEffect(() => {
    async function fetchData() {
      console.log('URLDYN que le paso alos fetch de MARCAS/ANIOS = ', urldyn);
      const marcas = await MiAutoService.fetchMarcas(urldyn);
      setMarcas(marcas);

      const años = await MiAutoService.fetchAnios(urldyn);
      setAnios(años);

      const ccarcel = await MiAutoService.fetchCasaCarcel(urldyn);
      setCasaCarcel(ccarcel);

      const zona = await MiAutoService.fetchZona(urldyn);
      setZonas(zona);

      const acc = await MiAutoService.fetchAccidentes(urldyn);
      setAccidentes(acc);

      const rent = await MiAutoService.fetchRentado(urldyn);
      setAutoRentado(rent);

      const fj = await MiAutoService.fetchFianza(urldyn);
      setFianza(fj);
    }
    if (urldyn) {
      fetchData();
    }
  }, [urldyn]);

  const steps = [1, 2, 3, 4, 5];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Vehiculos
            optionsUser={optionsUser}
            setOptionsUser={setOptionsUser}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            urldyn={urldyn}
          />
        );
      case 1:
        return (
          <Usos
            optionsUser={optionsUser}
            setOptionsUser={setOptionsUser}
            dataCotizacion={dataCotizacion}
            setDataCotizacion={setDataCotizacion}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            anios={anios}
            antiguedad={antiguedad}
            setAntiguedad={setAntiguedad}
          />
        );
      case 2:
        return (
          <Marcas
            optionsUser={optionsUser}
            setOptionsUser={setOptionsUser}
            dataCotizacion={dataCotizacion}
            setDataCotizacion={setDataCotizacion}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            marcas={marcas}
            modelos={modelos}
            setModelos={setModelos}
            versiones={versiones}
            setVersiones={setVersiones}
            casaCarcel={casaCarcel}
            zonas={zonas}
            fianza={fianza}
            urldyn={urldyn}
            antiguedad={antiguedad}
          />
        );
      case 3:
        return (
          <Planes
            optionsUser={optionsUser}
            setOptionsUser={setOptionsUser}
            dataCotizacion={dataCotizacion}
            setDataCotizacion={setDataCotizacion}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            urldyn={urldyn}
            antiguedad={antiguedad}
          />
        );
      case 4:
        return (
          <Opciones
            optionsUser={optionsUser}
            setOptionsUser={setOptionsUser}
            dataCotizacion={dataCotizacion}
            setDataCotizacion={setDataCotizacion}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            accidentes={accidentes}
            autoRentado={autoRentado}
            preparar={preparar}
            urldyn={urldyn}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  const [activeStep, setActiveStep] = useState(0);

  function stepper(activeStep) {
    return (
      <div className="stepper" activeStep={activeStep}>
        <div className="progress"></div>
        {steps.map((step) => (
          <div key={step}>
            {activeStep === step ? (
              <div className="active">{step}</div>
            ) : (
              <div className="circle">{step}</div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {activeStep === steps.length ? (
        <div className="box-final">
          <Nav />
          <Cotizacion
            optionsUser={optionsUser}
            setOptionsUser={setOptionsUser}
            urldyn={urldyn}
            setDataCotizacion={setDataCotizacion}
            dataCotizacion={dataCotizacion}
            valorCoti={valorCoti}
            setValorCoti={setValorCoti}
          />
        </div>
      ) : (
        <div className="box">
          <Nav stepper={stepper} activeStep={activeStep} />
          <>{getStepContent(activeStep)}</>
        </div>
      )}
    </>
  );
}
