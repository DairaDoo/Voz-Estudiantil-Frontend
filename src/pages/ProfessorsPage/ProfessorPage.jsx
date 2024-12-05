import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Modal, Alert } from "react-bootstrap";
import './ProfesorPage.module.css'; // Archivo CSS para los estilos

function ProfessorPage() {
  const [professors, setProfessors] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Cambiar el favicon al montar la página
    const favicon = document.querySelector("link[rel='icon']");
    const originalFavicon = favicon.href;
    favicon.href = "/logo-32x32.png"; // Ruta desde la carpeta public

    // Restaurar el favicon original al desmontar el componente
    return () => {
      favicon.href = originalFavicon;
    };
  }, []);

  useEffect(() => {
    fetch("https://voz-estudiantil-backend-production.up.railway.app/professors/all")
      .then((response) => response.json())
      .then((data) => setProfessors(data.professors))
      .catch(() => setError("Error al obtener los profesores."));

    fetch("https://voz-estudiantil-backend-production.up.railway.app/professor_questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data.questions))
      .catch(() => setError("Error al obtener las preguntas."));
  }, []);

  const handleShowModal = (professorId) => {
    setSelectedProfessor(professorId);
    setShowModal(true);
    setAnswers({});
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      setError("Por favor, responda todas las preguntas.");
      return;
    }

    questions.forEach((question) => {
      fetch("https://voz-estudiantil-backend-production.up.railway.app/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          professor_id: selectedProfessor,
          question_id: question.question_id,
          answer: answers[question.question_id],
        }),
      })
        .then((response) => response.json())
        .then(() => {
          setSuccessMessage("Gracias por evaluar al profesor.");
          setShowModal(false);
          setError("");

          // Recargar los datos de profesores y preguntas
          fetch("https://voz-estudiantil-backend-production.up.railway.app/professors/all")
            .then((response) => response.json())
            .then((data) => setProfessors(data.professors))
            .catch(() => setError("Error al obtener los profesores."));

          fetch("https://voz-estudiantil-backend-production.up.railway.app/professor_questions")
            .then((response) => response.json())
            .then((data) => setQuestions(data.questions))
            .catch(() => setError("Error al obtener las preguntas."));
        })
        .catch(() => setError("Error al enviar las respuestas."));
    });
  };

  // Filtrar los profesores para eliminar duplicados
  const uniqueProfessors = Array.from(new Set(professors.map((a) => a.professor_id)))
    .map((id) => professors.find((a) => a.professor_id === id));

  return (
    <Container className="my-5">
      <h1 className="text-center text-primary mb-4">Lista de Profesores</h1>

      {error && <Alert variant="danger" className="animated fadeIn">{error}</Alert>}
      {successMessage && <Alert variant="success" className="animated fadeIn">{successMessage}</Alert>}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {uniqueProfessors.map((professor) => (
          <Col key={professor.professor_id}>
            <div className="card shadow-lg rounded border-0 h-100">
              <div className="card-body p-4">
                <h5 className="card-title text-dark">{professor.name}</h5>
                <p className="card-text">
                  <strong>Calificación:</strong> {professor.overall_rating}
                </p>
                <p><strong>Universidad:</strong> {professor.university_name}</p>
                <p><strong>Campus:</strong> {professor.campus_name}</p>
                <p><strong>Departamento:</strong> {professor.department_name}</p>
                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  onClick={() => handleShowModal(professor.professor_id)}
                >
                  Evaluar Profesor
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Modal para las preguntas */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Evaluar Profesor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {questions.map((question) => (
            <Form.Group key={question.question_id} controlId={`question-${question.question_id}`}>
              <Form.Label>{question.question_text}</Form.Label>
              <Form.Control
                as="select"
                value={answers[question.question_id] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.question_id, parseInt(e.target.value))
                }
                className="mb-3"
              >
                <option value="">Selecciona una opción</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Enviar Respuestas
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProfessorPage;
