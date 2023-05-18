import React, { useEffect, useState } from 'react';
import Litbox from '../../components/LitBox/Litbox';
import PrevNext from '../../components/PrevNext/PrevNext';

import sarah from '../../assets/images/AvatarSarah.png';
import auto from '../../assets/images/auto-1.png';
import jeepeta from '../../assets/images/jeepeta-1.png';
import camioneta from '../../assets/images/camioneta-1.png';
import auto_chk from '../../assets/images/auto.png';
import jepeta_chk from '../../assets/images/jeepeta.png';
import camioneta_chk from '../../assets/images/camioneta.png';

export default function Vehiculos({
  optionsUser,
  setOptionsUser,
  activeStep,
  setActiveStep,
  urldyn
}) {
  const vehiculos = [
    {
      id: 1,
      title: 'Auto',
      src: auto,
      checked: auto_chk,
    },
    {
      id: 2,
      title: 'Jeepeta',
      src: jeepeta,
      checked: jepeta_chk,
    },
    {
      id: 3,
      title: 'Camioneta',
      src: camioneta,
      checked: camioneta_chk,
    },
  ];

  const [selectedItem, setSelectedItem] = useState(optionsUser);

  const handleItemClick = (vehiculo) => {
    setSelectedItem(vehiculo);
    console.log(vehiculo.title);

    setOptionsUser({ ...optionsUser, vehiculo: vehiculo.title });
    console.log(optionsUser);
  };

  const [puedeAvanzar, setPuedeAvanzar] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep != 0) {
      setActiveStep(activeStep - 1);
    }
  };

  useEffect(() => {
    if (optionsUser.vehiculo) {
      setPuedeAvanzar(true);
    } else {
      setPuedeAvanzar(false);
    }
  }, [optionsUser.vehiculo]);

  useEffect(() => {
    console.log(optionsUser);
    if (optionsUser.vehiculo !== '') {
      setSelectedItem(optionsUser);
      console.log(selectedItem);
    }
    console.log(optionsUser);
  }, []);

  return (
    <React.Fragment>
      <div className="contenedor">
        <img className="sarah" src={sarah} alt="Sarah" />
        <h1 className="titulo">
          ¿Qué tipo de vehiculo
          <br />
          quieres asegurar?
        </h1>

        <div className="mainbox">
          <div className="main">
            {vehiculos.map((vehiculo) => (
              <Litbox
                key={vehiculo.id}
                info={vehiculo}
                selected={
                  optionsUser && optionsUser.vehiculo === vehiculo.title
                }
                sizeW={'160px'}
                sizeH={'180px'}
                borderR={'10%'}
                onClick={handleItemClick}
              />
            ))}
          </div>
        </div>
      </div>
      <PrevNext
        handleNext={handleNext}
        handleBack={handleBack}
        puedeAvanzar={puedeAvanzar}
        urldyn={urldyn}
      />
    </React.Fragment>
  );
}
