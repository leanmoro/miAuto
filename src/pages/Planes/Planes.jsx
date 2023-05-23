import React, { useEffect, useState } from 'react';
import './Planes.css';
import Card from '../../components/CardPlan/CardPlan';
import sarah from '../../assets/images/AvatarSarah.png';
import PrevNext from '../../components/PrevNext/PrevNext';

import MiAutoService from '../../services/MiAutoService';

export default function Planes({
  optionsUser,
  setOptionsUser,
  dataCotizacion,
  setDataCotizacion,
  activeStep,
  setActiveStep,
  urldyn,
  antiguedad,
}) {
  const [puedeAvanzar, setPuedeAvanzar] = useState(false);

  const planes = [
    {
      id: 2,
      title: 'Básico',
      subtitle: 'Lorem ipsum dolor sit amet consecte',
      bullets: [
        { id: 101, value: 'Reprehenderit qui in ea  velit' },
        { id: 102, value: 'Numquam eius modi  incidunt' },
        { id: 103, value: 'Inventore  et quasi architecto' },
        { id: 104, value: 'Quis autem vel eum reprehenderit ' },
        { id: 105, value: 'Nisi ut  ex ea commodi conseqt' },
      ],
      src: '/imagen.png',
      shown: true,
    },
    {
      id: 3,
      title: 'Flex',
      subtitle: 'Duis aute irure dolor in reprehende',
      bullets: [
        { id: 110, value: 'Reprehenderit  in ea voluptate velit' },
        { id: 111, value: 'Numquam eius  tempora incidunt' },
        { id: 112, value: 'Inventore veritatis et  architecto' },
        { id: 113, value: 'Quis autem vel eum reprehenderit ' },
        { id: 114, value: 'Nisi ut  ex ea commodi conseqt' },
      ],
      src: '/imagen.png',
      shown: false,
    },
    {
      id: 1,
      title: 'Full',
      subtitle: 'Duis aute irure dolor in reprehende',
      bullets: [
        { id: 120, value: 'Reprehenderit  in ea voluptate velit' },
        { id: 121, value: 'Numquam eius  tempora incidunt' },
        { id: 122, value: 'Inventore veritatis et  architecto' },
        { id: 123, value: 'Quis autem vel eum reprehenderit ' },
        { id: 124, value: 'Nisi ut  ex ea commodi conseqt' },
      ],
      src: '/imagen.png',
      shown: false,
    },
    {
      id: 0,
      title: 'Premier',
      subtitle: 'Lorem ipsum dolor sit amet consecte',
      bullets: [
        { id: 130, value: 'Reprehenderit qui in ea  velit' },
        { id: 131, value: 'Numquam eius modi  incidunt' },
        { id: 132, value: 'Inventore  et quasi architecto' },
        { id: 133, value: 'Quis autem vel eum reprehenderit' },
        { id: 134, value: 'Nisi ut  ex ea commodi conseqt' },
      ],
      src: '/imagen.png',
      shown: false,
    },
  ];

  const [shownPlanes, setShownPlanes] = useState([]);

  const [coberturas, setCoberturas] = useState([]);

  const best = true;

  function updatePlanes(planes, optionsUser, antiguedad) {
    let planesShown = planes.map((item) => {
      if (item.title === 'Premier') {
        if (antiguedad < 4 && optionsUser.equipoGas === false) {
          item.shown = true;
        }
      } else if (item.title === 'Full') {
        if (antiguedad < 11 && optionsUser.equipoGas === false) {
          item.shown = true;
        }
      } else if (item.title === 'Flex') {
        if (optionsUser.equipoGas === false) {
          item.shown = true;
        }
      }
      return item;
    });

    let final = planesShown.filter((item) => {
      return item.shown === true;
    });
    setShownPlanes(final);
    console.log('shownPlanes = ', shownPlanes);
  }

  const [selectedItem, setSelectedItem] = useState(optionsUser);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep != 0) {
      setActiveStep(activeStep - 1);
    }
  };

  useEffect(() => {
    async function fetchData(urldyn, plan) {
      const coberturas = await MiAutoService.fetchCoberturas(urldyn, plan);
      setCoberturas(coberturas);
    }
    if (optionsUser.plan) {
      fetchData(urldyn, dataCotizacion[250041]);
      setPuedeAvanzar(true);
    } else {
      setPuedeAvanzar(false);
    }
  }, [optionsUser.plan]);

  const handleItemClick = (plan) => {
    setSelectedItem(plan);
    console.log(plan);
    setOptionsUser({ ...optionsUser, plan: plan.title });
    setDataCotizacion({ ...dataCotizacion, '250041': plan.id });
  };
 

  useEffect(() => {
    console.log('antiguedad que viene a planes =', antiguedad);
    updatePlanes(planes, optionsUser);
    if (optionsUser.plan !== '') {
      setSelectedItem(optionsUser);
    }
    console.log(optionsUser);
  }, []);

  useEffect(() => {
    console.log('dataCotizacion: ', dataCotizacion);
  }, [dataCotizacion, '250041']);

  return (
    <React.Fragment>
      <div className="contenedor">
        <img
          className="sarah"
          src={sarah}
          alt="Sarah"
          style={{ margin: '1rem 0' }}
        />
        <h1 className="titulo-plan">
          Selecciona ahora el plan de tu preferencia
        </h1>

        <div className="mainbox" style={{ margin: '0' }}>
          <div className="main" style={{ alignItems: 'end' }}>
            {shownPlanes.map((plan, index) => {
              if (index === 1) {
                return (
                  <>
                    <Card
                      best={best}
                      key={plan.id}
                      info={plan}
                      selected={optionsUser && optionsUser.plan === plan.title}
                      sizeW={'320px'}
                      borderR={'24px'}
                      onClick={handleItemClick}
                      coberturas={coberturas}
                    />
                  </>
                );
              } else {
                return (
                  <Card
                    key={plan.id}
                    info={plan}
                    selected={optionsUser && optionsUser.plan === plan.title}
                    sizeW={'350px'}
                    borderR={'24px'}
                    onClick={handleItemClick}
                    coberturas={coberturas}
                  />
                );
              }
            })}
          </div>
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
