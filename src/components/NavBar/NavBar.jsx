import React from 'react';
import logo from '../../assets/images/logohumano_1.png';
import './NavBar.css'

export default function NavBar({ stepper, activeStep }) {
  return (
    <>
      <div className="nav-react">
        <img
          className="logo-react"
          src={logo}
          onClick={() => {
            window.location.href = 'https://mcstaging.humano.com.do/';
          }}
        />
        {activeStep > 0 && <>{stepper(activeStep)}</>}
        {activeStep < 7 && (
          <div
            className="cancelar"
            onClick={() => {
              window.location.href = 'https://mcstaging.humano.com.do/';
            }}
          >
            Cancelar
          </div>
        )}
      </div>
    </>
  );
}
