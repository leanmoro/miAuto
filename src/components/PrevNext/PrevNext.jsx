import React from 'react';
import './PrevNext.css';
import arrow from '../../assets/images/Arrow.png';

export default function PrevNext({
  handleNext,
  handleBack,
  handleCotizar,
  puedeAvanzar,
  puedeCotizar,
  urldyn,
}) {
  const handleMagento = () => {
    window.location.href = `${urldyn}cotizar`;
  };
  return (
    <>
      <section className="prev-next">
        {urldyn ? (
          <button className="btn-prev" onClick={handleMagento}>
            <img src={arrow} />
            <span>Anterior</span>
          </button>
        ) : (
          <button className="btn-prev" onClick={handleBack}>
            <img src={arrow} />
            <span>Anterior</span>
          </button>
        )}

        {!puedeAvanzar ? (
          <button disabled={true} className="btn-next">
            Siguiente
          </button>
        ) : (
          <button
            className="btn-next"
            onClick={puedeCotizar ? handleCotizar : handleNext}
          >
            Siguiente
          </button>
        )}
      </section>
    </>
  );
}
