import React, { useEffect, useState } from 'react';
import './Marcas.css';

import sarah from '../../assets/images/AvatarSarah.png';

import SearchBar from '../../components/SearchBar/SearchBar';
import PrevNext from '../../components/PrevNext/PrevNext';

import MiAutoService from '../../services/MiAutoService';

export default function Marcas({
  optionsUser,
  setOptionsUser,
  dataCotizacion,
  setDataCotizacion,
  activeStep,
  setActiveStep,
  marcas,
  modelos,
  setModelos,
  versiones,
  setVersiones,
  casaCarcel,
  zonas,
  fianza,
  urldyn,
  antiguedad,
}) {
  const [puedeAvanzar, setPuedeAvanzar] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep != 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleChangeModelo = (e) => {
    const selModelo = e.target.value;
    console.log('selModelo:', selModelo);
    setOptionsUser({ ...optionsUser, idModelo: selModelo });
    setDataCotizacion({ ...dataCotizacion, '250001': selModelo });
    console.log(optionsUser);
  };

  const handleChangeVersion = (e) => {
    const selVersion = e.target.value;
    console.log('selVersion:', selVersion);
    setOptionsUser({ ...optionsUser, marcaModeloVersion: selVersion });
    setDataCotizacion({ ...dataCotizacion, '250004': selVersion });
  };

  const handleChangeCasaCarcel = (e) => {
    const selCasaCarcel = e.target.value;
    setOptionsUser({ ...optionsUser, casaCarcel: selCasaCarcel });
    setDataCotizacion({ ...dataCotizacion, '250027': selCasaCarcel });
  };

  const handleChangeFianza = (e) => {
    const selFianza = e.target.value;
    setOptionsUser({ ...optionsUser, fianza: selFianza });
    setDataCotizacion({ ...dataCotizacion, '250026': selFianza });
  };

  const handleChangeZona = (e) => {
    const selZona = e.target.value;
    setOptionsUser({ ...optionsUser, zonaCirculacion: selZona });
    setDataCotizacion({ ...dataCotizacion, '250323': selZona });
  };

  const [valorVehiculo, setValorVehiculo] = useState('');

  const handleChangeValorVehiculo = (e) => {
    const regex = /^[0-9\b]+$/; // Expresión regular para permitir solo números
    if (regex.test(e.target.value)) {
      setValorVehiculo(e.target.value);
      setOptionsUser({ ...optionsUser, valorVehiculo: valorVehiculo });
      setDataCotizacion({ ...dataCotizacion, '250016': valorVehiculo });
    }
  };

  useEffect(() => {
    if (optionsUser.marcaModeloVersion) {
      setPuedeAvanzar(true);
    } else {
      setPuedeAvanzar(false);
    }
  }, [optionsUser.marcaModeloVersion]);

  useEffect(() => {
    console.log('antiguedad = ', antiguedad);
    console.log('marcas', marcas);
    if (optionsUser.idMarca !== '') {
      setSelectedItem(optionsUser);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const modelos = await MiAutoService.fetchModelos(urldyn, optionsUser);
      setModelos(modelos);
    }
    if (urldyn) {
      fetchData();
    }
  }, [optionsUser.idMarca]);

  useEffect(() => {
    async function fetchData() {
      const versiones = await MiAutoService.fetchVersiones(urldyn, optionsUser);
      setVersiones(versiones);
    }
    if (urldyn) {
      fetchData();
    }
  }, [optionsUser.idModelo]);

  return (
    <React.Fragment>
      <div className="contenedor">
        <img className="sarah" src={sarah} alt="Sarah" />
        <h1 className="titulo" style={{ fontSize: '38px' }}>
          Por favor cuéntame más sobre tu vehiculo
        </h1>
        <div className="mainbox-split">
          <div className="usos-left">
            <div className="mainbox-marcas">
              <div className="search-bar-container">
                <SearchBar
                  marcas={marcas}
                  optionsUser={optionsUser}
                  setOptionsUser={setOptionsUser}
                />
              </div>
              <div className="main-mv">
                <div className="upperSel">
                  <select
                    defaultValue={'DEFAULT'}
                    className="select-mv"
                    onChange={handleChangeModelo}
                  >
                    <option value="DEFAULT" name="modelo" id="modelo">
                      Modelo
                    </option>
                    {modelos &&
                      modelos.map((modelo, index) => (
                        <option key={index} value={modelo.idModelo}>
                          {modelo.descripcionModelo}
                        </option>
                      ))}
                  </select>

                  <select
                    defaultValue={'DEFAULT'}
                    className="select-mv"
                    onChange={handleChangeVersion}
                  >
                    <option value="DEFAULT" name="version" id="version">
                      Version
                    </option>
                    {versiones &&
                      versiones.map((version, index) => (
                        <option
                          key={index}
                          value={version.descripcionIndiceDato}
                        >
                          {version.descripcionDato}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="lowerSel">
                  <select
                    defaultValue={'DEFAULT'}
                    className="select-mv"
                    onChange={handleChangeCasaCarcel}
                  >
                    <option value="DEFAULT" name="casa" id="casa">
                      Casa carcel
                    </option>
                    {casaCarcel &&
                      casaCarcel.map((casa, index) => (
                        <option key={index} value={casa.descripcionIndiceDato}>
                          {casa.descripcionDato}
                        </option>
                      ))}
                  </select>

                  <select
                    defaultValue={'DEFAULT'}
                    className="select-mv"
                    onChange={handleChangeZona}
                  >
                    <option value="DEFAULT" name="zona" id="zona">
                      Zona de circulación
                    </option>
                    {zonas?.map((zona, index) => (
                      <option key={index} value={zona.vaDato1}>
                        {zona.deDato}
                      </option>
                    ))}
                  </select>
                </div>

                {antiguedad < 11 && (
                  <div className="lastSel">
                    <input
                      required
                      placeholder="Valor del vehículo"
                      type="text"
                      value={valorVehiculo}
                      title="Debe ingresar números"
                      className="select-mv"
                      id="valorVehiculo"
                      name="valorVehiculo"
                      onChange={handleChangeValorVehiculo}
                    />
                    <select
                      defaultValue={'DEFAULT'}
                      className="select-mv"
                      onChange={handleChangeFianza}
                    >
                      <option value="DEFAULT" name="fianza" id="fianza">
                        Fianza
                      </option>
                      {fianza &&
                        fianza.map((fian, index) => (
                          <option key={index} value={fian.vaDato3}>
                            {fian.deDato}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="usos-right"></div>
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
