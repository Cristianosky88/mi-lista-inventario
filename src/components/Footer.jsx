import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';

// Componente Footer
export default function Footer() {
  // Puedes usar una variable para el año y el nombre si quieres mantenerlo DRY (Don't Repeat Yourself)
  const currentYear = new Date().getFullYear();
  const creatorName = "Cristian Parraga"; 

  return (
    <footer className="footer bg-light py-4 border-top mt-5">
      <div className="container text-center">
        {/* Sección de Íconos de Redes Sociales */}
        <div className="mb-3">
          <a href="https://github.com/Cristianosky88" target="_blank" rel="noopener noreferrer" className="text-dark mx-2" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark mx-2" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
          </a>
          <a href="https://instagram.com/cristianparraga_88" target="_blank" rel="noopener noreferrer" className="text-dark mx-2" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
        </div>
        
        {/* Texto de Copyright */}
        <p className="text-muted small mb-0">
          © {currentYear} Mi lista de Inventario | Proyecto Final Desarrollo Web | {creatorName}
        </p>
      </div>
    </footer>
  );
}