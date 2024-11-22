import React from 'react'; // Importamos la biblioteca React para construir el componente.
import { Navbar, FormControl, Button, InputGroup } from 'react-bootstrap'; // Importamos componentes de Bootstrap que usaremos.
import styles from './Navbar.module.css'; // Importamos estilos personalizados para este componente.
import logo_img from '@assets/images/VozEstudiantil_logo.png'; // Usa el alias definido en jsconfig.json para la imagen del logo

function CustomNavbar() { // Definimos un componente funcional llamado CustomNavbar.
  return (
    <Navbar expand="lg" bg="light" variant="light" className="px-3"> {/* Creamos el Navbar con opciones de expansión y estilo. */}
      <Navbar.Brand href="#" className="d-flex align-items-center"> {/* Enlace de marca que contiene el logo y el nombre. */}
        <img
          src={logo_img} // Establecemos la fuente de la imagen del logo.
          alt="Logo" // Texto alternativo para la imagen.
          className="d-inline-block align-top" // Clases de Bootstrap para alinear la imagen.
          style={{ width: '50px', marginRight: '8px' }} // Estilos en línea para ajustar el tamaño y margen de la imagen.
        />
        <span className="d-none d-lg-inline h2">Voz Estudiantil</span> {/* Nombre de la marca que solo se muestra en pantallas grandes. */}
      </Navbar.Brand>

      <div className={`flex-grow-1 d-flex justify-content-center ${styles.searchContainer}`}> {/* Contenedor del campo de búsqueda, ocupa el espacio restante. */}
        <InputGroup className="w-100"> {/* Grupo de entrada para el campo de búsqueda. */}
          <InputGroup.Text className="border-0"> {/* Texto que se muestra dentro del campo de búsqueda (icono de búsqueda). */}
            <i className="bi bi-search" style={{ fontSize: '1rem' }}></i> {/* Icono de búsqueda. */}
          </InputGroup.Text>
          <FormControl
            type="search" // Tipo de entrada como búsqueda.
            placeholder="Buscar" // Texto de marcador de posición.
            className="border-start-0" // Quitar el borde izquierdo del campo de búsqueda.
            aria-label="Search" // Atributo accesible que describe el campo.
          />
        </InputGroup>
      </div>

      <Navbar.Toggle aria-controls="navbarResponsive" className="mb-0" /> {/* Botón que alterna la visibilidad del menú en pantallas pequeñas. */}

      <Navbar.Collapse id="navbarResponsive" className="justify-content-end"> {/* Sección colapsable del Navbar para mostrar botones de inicio de sesión y registro. */}
        <div className={`d-none d-lg-flex ${styles.desktopButtons}`}> {/* Botones que se muestran solo en pantallas grandes. */}
          <Button variant="outline-primary" className="me-2"> {/* Botón de inicio de sesión con variante de contorno. */}
            Log In
          </Button>
          <Button variant="primary"> {/* Botón de registro con variante primaria. */}
            Sign Up
          </Button>
        </div>

        <div className={`d-lg-none d-flex flex-column align-items-center p-3 ${styles.mobileButtons}`}> {/* Botones que se muestran solo en pantallas pequeñas. */}
          <Button variant="outline-primary" className={`mb-2 ${styles.mobileButton}`}> {/* Botón de inicio de sesión para móviles. */}
            Log In
          </Button>
          <Button variant="primary" className={styles.mobileButton}> {/* Botón de registro para móviles. */}
            Sign Up
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar; // Exportamos el componente para poder utilizarlo en otras partes de la aplicación.
