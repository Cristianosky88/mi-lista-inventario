import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createItem, getItem, updateItem } from "../services/itemsService";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card, Image, Alert, Spinner } from "react-bootstrap";

export default function CreateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      stock: 0,
      imageUrl: ""
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  const imageUrl = watch("imageUrl");

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);
      getItem(id)
        .then(data => {
          if (data) {
            reset({
              title: data.title || "",
              description: data.description || "",
              price: data.price ?? 0,
              stock: data.stock ?? 0,
              imageUrl: data.imageUrl || ""
            });
          } else {
            setError("No se encontró el ítem");
          }
        })
        .catch(err => {
          setError("Error al cargar el ítem: " + err.message);
        })
        .finally(() => setLoading(false));
    }
  }, [id, reset]);

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  // --- FUNCIÓN DE CORRECCIÓN DE URL ---:/
  const fixImageUrl = (url) => {
    if (!url) return "";
    // Si empieza por "https:/" y no por "https://", lo arregla
    return url.startsWith("https:/") && !url.startsWith("https://")
      ? url.replace("https:/", "https://")
      : url;
  };

  const onSubmit = async (formData) => {
    try {
      setError(null);

      const cleanData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description?.trim() || "",
        imageUrl: fixImageUrl(formData.imageUrl?.trim() || "")
      };

      if (id) {
        await updateItem(id, cleanData);
      } else {
        await createItem(cleanData);
      }
      navigate("/", { replace: true });
    } catch (err) {
      setError("Error al guardar: " + err.message);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      {/* Botón de volver al listado */}
      <Button
        variant="link"
        onClick={() => navigate("/")}
        className="mb-3 p-0 text-decoration-none"
      >
        ← Volver al listado
      </Button>

      <Card>
        <Card.Body>
          <Card.Title className="mb-4">
            {id ? "Editar ítem" : "Crear nuevo ítem"}
          </Card.Title>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>
                Título <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                {...register("title", {
                  required: "El título es obligatorio",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  maxLength: { value: 100, message: "Máximo 100 caracteres" }
                })}
                placeholder="Ej: Laptop Dell XPS 15"
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("description", {
                  maxLength: { value: 500, message: "Máximo 500 caracteres" }
                })}
                placeholder="Describe el producto..."
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Precio <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                {...register("price", {
                  required: "El precio es obligatorio",
                  valueAsNumber: true,
                  min: { value: 0, message: "Debe ser mayor o igual a 0" },
                  max: { value: 999999, message: "Precio demasiado alto" }
                })}
                placeholder="0.00"
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Stock <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                {...register("stock", {
                  required: "El stock es obligatorio",
                  valueAsNumber: true,
                  min: { value: 0, message: "Debe ser mayor o igual a 0" },
                  max: { value: 99999, message: "Stock demasiado alto" }
                })}
                placeholder="0"
                isInvalid={!!errors.stock}
              />
              <Form.Control.Feedback type="invalid">
                {errors.stock?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de la imagen</Form.Label>
              <Form.Control
                {...register("imageUrl", {
                  pattern: {
                    value: /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/.*)?$/i,
                    message: "Debe ser una URL válida"
                  }
                })}
                placeholder="https://ejemplo.com/imagen.jpg"
                isInvalid={!!errors.imageUrl}
              />
              <Form.Control.Feedback type="invalid">
                {errors.imageUrl?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Formatos soportados: JPG, PNG, GIF, WebP, SVG
              </Form.Text>

              {imageUrl && !imageError && (
  <div className="mt-3">
    <p className="mb-2">
      <strong>Vista previa:</strong>
    </p>
    {imageUrl.trim().toLowerCase().endsWith('.svg') ? (
      <iframe
        src={imageUrl}
        style={{ width: "300px", height: "300px", border: "none" }}
        title="Vista previa SVG"
      />
    ) : (
      <Image
        src={imageUrl}
        thumbnail
        style={{ maxWidth: "300px", maxHeight: "300px", objectFit: "contain" }}
        onError={() => setImageError(true)}
        alt="Vista previa del producto"
      />
    )}
  </div>
)}


              {imageUrl && imageError && (
                <Alert variant="warning" className="mt-3">
                  No se pudo cargar la imagen desde esta URL. Verifica que sea correcta y accesible.
                </Alert>
              )}
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Guardando...
                  </>
                ) : (
                  <>{id ? "Guardar cambios" : "Agregar producto"}</>
                )}
              </Button>
              <Button
                type="button"
                variant="outline-secondary"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
