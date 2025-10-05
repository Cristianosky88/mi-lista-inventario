import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function AppNavbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Clipboard/Lista de inventario */}
            <rect x="8" y="4" width="16" height="24" rx="2" fill="#f8f9fa" stroke="#4A90E2" strokeWidth="2"/>
            
            {/* Clip superior */}
            <rect x="12" y="2" width="8" height="4" rx="1" fill="#4A90E2"/>
            
            {/* Líneas de texto/items */}
            <line x1="11" y1="10" x2="21" y2="10" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round"/>
            <line x1="11" y1="15" x2="21" y2="15" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round"/>
            <line x1="11" y1="20" x2="18" y2="20" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round"/>
            
            {/* Checkmarks */}
            <circle cx="13" cy="10" r="1.5" fill="#28a745"/>
            <circle cx="13" cy="15" r="1.5" fill="#28a745"/>
            <circle cx="13" cy="20" r="1.5" fill="#ffc107"/>
          </svg>
          <span>Inventario</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/"
              active={isActive("/")}
              className={isActive("/") ? "fw-semibold" : ""}
            >
              Listado
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/create"
              active={isActive("/create")}
              className={isActive("/create") ? "fw-semibold" : ""}
            >
              Crear Producto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}