import { useEffect, useState } from "react";
import { getItem } from "../services/itemsService";
import { useParams, Link } from "react-router-dom";
import { Card, Spinner, Alert, Button } from "react-bootstrap";

export default function Listado() { 
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getItem(id)
      .then(data => {
        if (data) {
          setItem(data);
        } else {
          setError("No se encontró el producto");
        }
      })
      .catch(err => {
        setError("Error al cargar el producto: " + err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
        <Link to="/" className="btn btn-primary">
          Volver al listado
        </Link>
      </Alert>
    );
  }

  if (!item) return null;

  return (
    <>
      <Button 
        as={Link}
        to="/"
        variant="link" 
        className="mb-3 p-0 text-decoration-none"
      >
        ← Volver al listado
      </Button>

      <Card>
        {/* Imagen del producto */}
        {item.imageUrl && !imageError && (
          <Card.Img
            variant="top"
            src={item.imageUrl}
            alt={item.title}
            style={{ 
              width: "100%", 
              maxHeight: "400px", 
              objectFit: "contain",
              backgroundColor: "#f8f9fa",
              padding: "1rem"
            }}
            onError={() => setImageError(true)}
          />
        )}

        {item.imageUrl && imageError && (
          <div 
            className="d-flex align-items-center justify-content-center bg-light" 
            style={{ height: "300px" }}
          >
            <div className="text-center text-muted">
              <svg 
                width="80" 
                height="80" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p className="mt-2 mb-0">Imagen no disponible</p>
            </div>
          </div>
        )}

        {!item.imageUrl && (
          <div 
            className="d-flex align-items-center justify-content-center bg-light" 
            style={{ height: "300px" }}
          >
            <div className="text-center text-muted">
              <svg 
                width="80" 
                height="80" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p className="mt-2 mb-0">Sin imagen</p>
            </div>
          </div>
        )}

        <Card.Body>
          <Card.Title className="fs-3 mb-3">{item.title}</Card.Title>
          
          {item.description && (
            <Card.Text className="text-muted mb-4">
              {item.description}
            </Card.Text>
          )}

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
              <span className="text-muted">Precio:</span>
              <span className="fs-4 fw-bold text-primary">
                ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
              </span>
            </div>
            
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">Stock disponible:</span>
              <span className={`fw-semibold ${item.stock > 0 ? 'text-success' : 'text-danger'}`}>
                {item.stock} {item.stock === 1 ? 'unidad' : 'unidades'}
              </span>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Button 
              as={Link} 
              to={`/edit/${id}`} 
              variant="primary"
            >
              Editar producto
            </Button>
            <Button 
              as={Link} 
              to="/" 
              variant="outline-secondary"
            >
              Volver
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}