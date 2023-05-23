import React, { useEffect } from 'react';
import '../Opcionales/Opcionales.css';

export default function Adicionales({
  handleCheck,
  isChecked,
  dataCotizacion,
}) {
  useEffect(() => {
    console.log('dataCotizacion: 250105 = ', dataCotizacion[250105]);
  }, [dataCotizacion]);

  return (
    <>
      <div className="c-box first-c-box">
        <label className="labelchk">
          <span className={`span_chk ${isChecked('250105')}`}>
            Responsabilidad Civil
          </span>
          <div className="inner_chk">
            <span className="chkdet">+ RD$ 2.000</span>

            {dataCotizacion[250105] ? (
              <input
                className="box-chk"
                value="250105"
                type="checkbox"
                onChange={handleCheck}
                checked={true}
              />
            ) : (
              <input
                className="box-chk"
                value="250105"
                type="checkbox"
                onChange={handleCheck}
                checked={false}
              />
            )}
          </div>
        </label>
        <span className="span-detail">Aumentas el limite a $300.000</span>
      </div>
    </>
  );
}
