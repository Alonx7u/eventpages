import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import './App.css';
import inicio from './img/inicio.jpeg';

function MyModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Bienvenidos a la invitación de Elena y Oswaldo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Esta es una invitación especial para nuestra boda ¡Te esperamos!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Ingresar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const weddingDate = new Date('2024-11-16T20:00:00');

  const calculateTimeRemaining = () => {
    const now = new Date();
    const timeDiff = weddingDate - now;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>
        <i className='fas fa-heart'></i>Nuestra Boda<i className='fas fa-heart'></i>
        </h1>
      <h2>Lorena y Oswaldo</h2>
      {/* Tarjeta con la imagen y el contador */}
      <Card className="text-center" style={{ width: '100%', maxWidth: '900px', margin: '20px auto', borderRadius: '10px', position: 'relative' }}>
        <Card.Img variant="top" src={inicio} alt="Elena y Oswaldo" />
        <div className="overlay">
          <Card.Title className="wedding-title">¡Cuenta Regresiva!</Card.Title>
          <div className="countdown-timer">
            <div className="time-section">
              <div className="time">{timeRemaining.days}</div>
              <div className="label">Días</div>
            </div>
            <div className="time-section">
              <div className="time">{timeRemaining.hours}</div>
              <div className="label">Horas</div>
            </div>
            <div className="time-section">
              <div className="time">{timeRemaining.minutes}</div>
              <div className="label">Minutos</div>
            </div>
            <div className="time-section">
              <div className="time">{timeRemaining.seconds}</div>
              <div className="label">Segundos</div>
            </div>
          </div>
        </div>
        
      </Card>

      <MyModal />
    </div>
  );
}

export default App;
