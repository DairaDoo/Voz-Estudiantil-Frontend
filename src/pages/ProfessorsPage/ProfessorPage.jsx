import React, { useState, useEffect } from "react";
import { Container, Table, Card, Row, Col, Alert } from "react-bootstrap";

function ProfessorPage() {
  const [professors, setProfessors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Obtener todos los profesores
    fetch("http://localhost:5000/professors/all") // Cambiar a la URL real
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los profesores.");
        }
        return response.json();
      })
      .then((data) => {
        setProfessors(data.professors);
      })
      .catch(() => {
        setError("Error al obtener los profesores.");
      });
  }, []);

  return (
    <Container>
      <h1 className="my-4 text-center">Lista de Profesores</h1>

      {/* Mostrar error si existe */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Mostrar tarjetas de profesores */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {professors.map((professor) => (
          <Col key={professor.professor_id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{professor.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {professor.department_name}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Campus:</strong> {professor.campus_name} <br />
                  <strong>Universidad:</strong> {professor.university_name} <br />
                  <strong>Calificación:</strong> {professor.overall_rating} <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProfessorPage;
