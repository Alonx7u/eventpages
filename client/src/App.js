import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./App.css";
import i1 from "./img/1.jpeg";
import i2 from "./img/2.jpeg";
import i3 from "./img/3.jpeg";
import i4 from "./img/4.jpeg";
import i5 from "./img/5.jpeg";
import i6 from "./img/6.jpeg";
import img2 from "./img/img.jpg";
import inicio from "./img/inicio.jpeg";
import mA from "./img/mA.jpg";
import mN from "./img/mN.jpg";
import novios from "./img/novios1.gif";
import PA from "./img/PA.jpg";
import PN from "./img/PN.jpg";
import post from "./img/post.gif";
import salon from "./img/salon1.jpg";
import vestir from "./img/vestir.png";

// Musica
const MusicPlayer = ({ playMusic }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (playMusic && audioRef.current) {
      audioRef.current.audio.current.play(); // Reproduce la música automáticamente
    } else if (!playMusic && audioRef.current) {
      audioRef.current.audio.current.pause(); // Pausa la música
    }
  }, [playMusic]);

  return (
    <div className="music-container" style={{ position: "relative",  }}>
      <h3>¡Escucha nuestra canción!</h3>
      <AudioPlayer
        ref={audioRef}
        src="/music/close.mp3"
        onPlay={() => console.log("Reproduciendo...")}
        onPause={() => console.log("Pausado...")}
      />
      {playMusic && (
        <div className="floating-notes">
          <div className="note">♪</div>
          <div className="note">♫</div>
          <div className="note">♪</div>
          <div className="note">♫</div>
          <div className="note">♪</div>
        </div>
      )}
    </div>
  );
};

// Modal de bienvenida
function MyModal({ onIngresar }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // Muestra el modal al cargar
  }, []);

  const handleClose = () => {
    setShow(false); // Cierra el modal solo al presionar el botón
    onIngresar(); // Activa la música después de cerrar el modal
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static" // Evita cerrar el modal haciendo clic fuera de él
      keyboard={false} // Evita cerrar el modal con la tecla "Esc"
    >
      <Modal.Header className="d-flex flex-column align-items-center">
        <Modal.Title className="custom-title">
          Bienvenidos a la invitación de Elena y Oswaldo
        </Modal.Title>
        <Button
          variant="btn btn-outline-secondary"
          onClick={handleClose}
          className="btn-animate1 mt-3"
        >
          Ingresar
        </Button>
      </Modal.Header>
    </Modal>
  );
}

// Footer.js
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 Invitación a la boda de Elena y Oswaldo. Todos los derechos reservados.</p>
        <p className="developer-info">
          Desarrollado por Alondra Gomez
          <a
            href="https://www.facebook.com/alonx.gomez17" // Reemplaza con tu enlace de Facebook
            target="_blank"
            rel="noopener noreferrer"
            className="facebook-link"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </p>
        <p>Esta página está diseñada especialmente para eventos</p>
      </div>
    </footer>
  );
}




// App principal
function App() {
  // Inicializar AOS
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  // Deshabilitar botón después de la fecha límite
  const disableDate = new Date("2024-10-15T20:23:00"); //fecha limite
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const now = new Date();
    if (now > disableDate) {
      setIsButtonDisabled(true);
    }
  }, []);

  // Contador de tiempo
  const weddingDate = new Date("2024-11-16T20:00:00");
  const [playMusic, setPlayMusic] = useState(false); // El estado inicial es `false`

  const calculateTimeRemaining = () => {
    const now = new Date();
    const timeDiff = weddingDate - now;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
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
      {/* Tarjeta con la imagen y el contador */}
      <Card
        className="img-fluid"
        style={{
          marginBottom: "15px",
        }}
      >
        <Card.Img variant="top" src={inicio} alt="Elena y Oswaldo" />
        <div className="overlay">
          <Card.Title className="wedding-title">
            ¡Cuenta Regresiva!<i className="fab fa-gratipay"></i>
          </Card.Title>
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
      {/* Mensaje de bienvenida */}
      <h1
        data-aos="fade-up" 
        data-aos-duration="1000"
        data-aos-delay="200"
        style={{
          marginBottom: "35px", // Espacio entre el mensaje de bienvenida y la invitación
        }}
      >
        <i className="far fa-heart"></i>Nuestra Boda{" "}
        <i className="far fa-heart"></i>
      </h1>
      <h2 data-aos="fade-left" data-aos-duration="1000"
        data-aos-delay="200" style={{ marginBottom: "25px" }}>
        Elena y Oswaldo
      </h2>
      <Card
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
        className="text-center custom-card"
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "20px auto",
          borderRadius: "10px",
        }}
      >
        {/* Invitación */}
        <Card.Body>
          <Card.Title className="custom-card-title">
            Tenemos el gusto de invitarte en este día tan importante de nuestras
            vidas
          </Card.Title>
          <Card.Img variant="top" src={post} alt="post" style={{ width: "10%",
          maxWidth: "900px",
          margin: "20px auto",
          borderRadius: "10px",}}/>
          <Card.Text className="custom-card-text">
            ¡Los esperamos! Será un día inolvidable lleno de amor y felicidad.
          </Card.Text>
        </Card.Body>
      </Card>
      {/* Reproductor de música */}
      <MusicPlayer playMusic={playMusic} />
      {/* LUGAR Y LA FECHA */}
      <Card
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
        className="text-center"
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "20px auto",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <Card.Img variant="top" src={img2} alt="Elena y Oswaldo" />
      </Card>
      <h4 className="text-center">Cuándo & Dónde</h4>
      <Card
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
        className="text-center custom-card"
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "20px auto",
          borderRadius: "10px",
        }}
      >
        <Card.Body data-aos="fade-up" data-aos-duration="1000"
        data-aos-delay="200">
          <Card.Title className="custom-card-title">Lugar</Card.Title>
          <Card.Img
            variant="top"
            src={salon}
            alt="salon"
            style={{ maxWidth: "450px" }}
          />
          <Card.Text className="custom-card-text">
            <strong>Salón:</strong> Club Country Tapachula
            <br />
            <strong>Dirección:</strong> Calle 3a. Ote. 33, Los Naranjos, Centro,
            30830 Tapachula de Córdova y Ordóñez, Chis.
          </Card.Text>
          <Button
            className="btn-animate"
            variant="info"
            style={{ marginBottom: "20px" }}
            href="https://maps.app.goo.gl/ypiEgAGMJitzgkrK6"
            target="_blank"
          >
            Ver Mapa <i className="fas fa-map-marker-alt"></i>
          </Button>
          <Card.Title className="custom-card-title">Fecha y Hora</Card.Title>
          <Card.Text className="custom-card-text">
            <strong>Fecha:</strong> 16 de Noviembre de 2024
            <br />
            <strong>Hora:</strong> 20:00 hrs
          </Card.Text>
        </Card.Body>
      </Card>
      <h4 className="text-center">Código de vestimenta</h4>
      <Card.Img
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
        variant="top"
        src={vestir}
        alt="vestir"
        style={{ maxWidth: "450px", margin: "20px auto" }}
      />
      <div className="card my-4" style={{ background: "#fcf8d3" }}>
        <div className="card-body">
          <h4 className="text-center">Nosotros</h4>
          <div className="row" data-aos="fade-up" data-aos-duration="1000"
        data-aos-delay="200">
            <div className="col-md-6">
              <img
                src={i1}
                alt="foto1"
                className="img-fluid"
                style={{ borderRadius: "10px", marginBottom: "15px" }}
              />
            </div>
            <div className="col-md-6">
              <img
                src={i2}
                alt="foto2"
                className="img-fluid"
                style={{ borderRadius: "10px", marginBottom: "15px" }}
              />
            </div>
          </div>
          <div className="row" data-aos="fade-up" data-aos-duration="1000"
        data-aos-delay="200">
            <div className="col-md-6">
              <img
                src={i3}
                alt="foto3"
                className="img-fluid"
                style={{ borderRadius: "10px", marginBottom: "15px" }}
              />
            </div>
            <div className="col-md-6">
              <img
                src={i4}
                alt="foto4"
                className="img-fluid"
                style={{ borderRadius: "10px", marginBottom: "15px" }}
              />
            </div>
          </div>
          <div className="row" data-aos="fade-up" data-aos-duration="1000"
        data-aos-delay="200">
            <div className="col-md-6">
              <img
                src={i5}
                alt="foto5"
                className="img-fluid"
                style={{ borderRadius: "10px", marginBottom: "15px" }}
              />
            </div>
            <div className="col-md-6">
              <img
                src={i6}
                alt="foto6"
                className="img-fluid"
                style={{ borderRadius: "10px", marginBottom: "15px" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* PADRES */}
      <h4>Padres de los Novios</h4>
      <div className="row row-cols-1 row-cols-md-2 g-4" data-aos="fade-left" data-aos-duration="1000"
        data-aos-delay="200">
        <div className="col">
          <div className="card-fotos">
            <img
              src={PA}
              className="card-img-top"
              alt="Padre-Novia"
              style={{ borderRadius: "70%" }}
            />
            <div className="card-body">
              <h5 className="card-title">JOSE DANIEL MALIACHI</h5>
              <p className="card-text">Padre de la Novia</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card-fotos">
            <img
              src={mA}
              className="card-img-top"
              alt="Madre-Novia"
              style={{ borderRadius: "70%" }}
            />
            <div className="card-body">
              <h5 className="card-title">RUBELINA MUÑOZ</h5>
              <p className="card-text">Madre de la Novia</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card-fotos">
            <img
              src={PN}
              className="card-img-top"
              alt="Padre-Novio"
              style={{ borderRadius: "70%" }}
            />
            <div className="card-body">
              <h5 className="card-title">LUIS GALINDO</h5>
              <p className="card-text">Padre del Novio</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card-fotos">
            <img
              src={mN}
              className="card-img-top"
              alt="Madre-Novio"
              style={{ borderRadius: "70%" }}
            />
            <div className="card-body">
              <h5 className="card-title">MARIA OFELIA LOPEZ</h5>
              <p className="card-text">Madre del Novio</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "2rem" }}></div>
      <Card
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="200"
        className="text-center custom-card"
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "20px auto",
          borderRadius: "10px",
        }}
      >
        <Card.Body>
          <Card.Title className="custom-card-title">
            Confirmar Asistencia
          </Card.Title>
          <Card.Text className="custom-card-text">
            Por favor confirma tu asistencia antes del 16 de Octubre de 2024
          </Card.Text>
          <Card.Img
            className="img-novios"
            src={novios}
            alt="novios"
            style={{ maxWidth: "200px" }}
          />
          <Card.Text className="custom-card-text">
            ¡Esperamos contar con tu presencia!
          </Card.Text>
          <Button
            className="btn-animate"
            variant="success"
            style={{ marginBottom: "20px" }}
            href="https://api.whatsapp.com/send?phone=9625133728&text=%C2%A1%C2%A1Hola,%20confirmo%20mi%20asistencia%20a%20tu%20boda!!%F0%9F%91%B0%F0%9F%8F%BB%E2%80%8D%E2%99%80%E2%9D%A4%F0%9F%A4%B5%F0%9F%8F%BB"
            target="_blank"
            disabled={isButtonDisabled}
          >
            Confirmar Asistencia <i className="fas fa-check"></i>
          </Button>
          {/* <Button
            variant="danger"
            style={{ marginBottom: "20px", marginLeft: "10px" }}
            href="https://api.whatsapp.com/send?phone=9625133728&text=Lo%20siento,%20no%20podre%20asistir%20a%20tu%20boda%F0%9F%98%94"
            target="_blank"
          >
            No Confirmo Asistencia <i className="fas fa-times"></i>
          </Button> */}
        </Card.Body>
      </Card>
      {/* Footer */}
      <Footer  />
      {/* Modal */}
      <MyModal onIngresar={() => setPlayMusic(true)} />{" "}
      {/* Solo reproduce música al cerrar el modal */}
    </div>
  );
}

export default App;
