import React, { useEffect, useState } from 'react';
import './Opcionales.css';

export default function Opcionales({ handleCheck, isChecked, dataCotizacion }) {
  const listaCheckBoxes = [
    { value: '250035', label: 'Aeroambulancia' },
    { value: '250029', label: 'Asistencia vial' },
    { value: '250062', label: 'Últimos gastos' },
    { value: '250042', label: 'Seguridad vial' },
    { value: '250089', label: 'Seguro de vida' },
  ];

  useEffect(() => {
    console.log('dataCotizacion: ', dataCotizacion);
  }, [dataCotizacion]);

  return (
    <>
      {listaCheckBoxes.map((item, index) => (
        <div
          className={`c-box ${index === 0 ? 'first-c-box' : ''}`}
          key={index}
        >
          <label className="labelchk">
            <span className={`span_chk ${isChecked(item.value)}`}>
              {item.label}
            </span>
            {/* {item.label} */}
            <div className="inner_chk">
              <span className="chkdet">+ RD$ 2.000</span>
              {dataCotizacion[item.value] ? (
                <input
                  className="box-chk"
                  value={item.value}
                  type="checkbox"
                  onChange={handleCheck}
                  checked={true}
                />
              ) : (
                <input
                  className="box-chk"
                  value={item.value}
                  type="checkbox"
                  onChange={handleCheck}
                  checked={false}
                />
              )}
            </div>
          </label>
        </div>
      ))}
    </>
  );
}
