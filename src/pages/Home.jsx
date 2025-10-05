import React, { useEffect, useState } from "react";
import { subscribeToItems, deleteItem } from "../services/itemsService";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function Home() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = subscribeToItems(setItems);
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este ítem?")) {
      await deleteItem(id);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado</h2>
        <Button onClick={() => navigate("/create")}>Agregar Producto</Button>
      </div>

      <Row xs={1} md={2} lg={3} className="g-3">
        {items.map(item => (
          <Col key={item.id}>
            <Card>
              {item.imageUrl && (
                <Card.Img
                  variant="top"
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ height: "180px", objectFit: "cover" }}
                  onError={e => { e.target.src = "https://via.placeholder.com/180?text=Sin+Imagen"; }}
                />
              )}
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description?.slice(0,120)}</Card.Text>
                <div className="d-flex justify-content-between">
                  <div>
                    <Link to={`/item/${item.id}`} className="btn btn-sm btn-outline-primary me-2">Ver</Link>
                    <Link to={`/edit/${item.id}`} className="btn btn-sm btn-outline-secondary">Editar</Link>
                  </div>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Eliminar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
