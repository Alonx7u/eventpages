import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './App.css';
import img2 from './img/img.jpg';
import inicio from './img/inicio.jpeg';

// Musica
const MusicPlayer = ({ playMusic }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (playMusic && audioRef.current) {
      audioRef.current.audio.current.play();  // Reproduce la música automáticamente
    }
  }, [playMusic]);

  return (
    <div>
      <h3>¡Escucha nuestra canción!</h3>
      <AudioPlayer
        ref={audioRef} 
        src="/music/love.mp3"
        onPlay={e => console.log("Reproduciendo...")}
      />
    </div>
  );
};

// Modal
function MyModal({ onIngresar }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    onIngresar(); // Dispara la música cuando se cierre el modal
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
  <Modal.Header className="d-flex flex-column align-items-center">
    <Modal.Title className="custom-title">Bienvenidos a la invitación de Elena y Oswaldo</Modal.Title>
    <Button variant="secondary" onClick={handleClose} className="mt-3">
      Ingresar
    </Button>
  </Modal.Header>
</Modal>


  );
}

// App principal
function App() {
  const weddingDate = new Date('2024-11-16T20:00:00');
  const [playMusic, setPlayMusic] = useState(false);

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
        <i className='far fa-heart'></i>Nuestra Boda<i className='far fa-heart'></i>
      </h1>
      <h2>Elena y Oswaldo</h2>
      {/* Tarjeta con la imagen y el contador */}
      <Card className="text-center" style={{ width: '100%', maxWidth: '900px', margin: '20px auto', borderRadius: '10px', position: 'relative' }}>
        <Card.Img variant="top" src={inicio} alt="Elena y Oswaldo" />
        <div className="overlay">
          <Card.Title className="wedding-title">¡Cuenta Regresiva!<i className="fab fa-gratipay"></i></Card.Title>
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

      {/* Reproductor de música */}
      <MusicPlayer playMusic={playMusic} />

      <Card className="text-center custom-card" style={{ width: '100%', maxWidth: '900px', margin: '20px auto', borderRadius: '10px' }}>
  <Card.Body>
    <Card.Title className="custom-card-title">Tenemos el gusto de invitarte en este día tan importante de nuestras vidas</Card.Title>
    <Card.Text className="custom-card-text">
      ¡Los esperamos! Será un día inolvidable lleno de amor y felicidad.
    </Card.Text>
  </Card.Body>
</Card>

{/* 
<Card className="text-center" style={{ width: '100%', maxWidth: '900px', margin: '20px auto', borderRadius: '10px', position: 'relative' }}>
        <Card.Img variant="top" src={img1} alt="Elena y Oswaldo" />
      </Card> */}

      <Card className="text-center" style={{ width: '100%', maxWidth: '900px', margin: '20px auto', borderRadius: '10px', position: 'relative' }}>
        <Card.Img variant="top" src={img2} alt="Elena y Oswaldo" />
      </Card>

      <h4 className="text-center">Dónde & Cuándo</h4>
      

      {/* Modal */}
      <MyModal onIngresar={() => setPlayMusic(true)} />


    </div>

    
  );
}

export default App;
