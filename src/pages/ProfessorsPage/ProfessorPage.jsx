import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Modal, Alert } from "react-bootstrap";
import { FaUniversity, FaBuilding, FaChalkboardTeacher } from "react-icons/fa";
import StarRating from "@/components/StarRating/StarRating";

function ProfessorPage() {
  const [professors, setProfessors] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/professors/all")
      .then((response) => response.json())
      .then((data) => setProfessors(data.professors))
      .catch(() => setError("Error al obtener los profesores."));

    fetch("http://127.0.0.1:5000/professor_questions")
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
      fetch("http://127.0.0.1:5000/responses", {
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
        .then(() => {
          setSuccessMessage("Gracias por evaluar al profesor.");
          setShowModal(false);
          setError("");

          fetch("http://127.0.0.1:5000/professors/all")
            .then((response) => response.json())
            .then((data) => setProfessors(data.professors))
            .catch(() => setError("Error al obtener los profesores."));

          fetch("http://127.0.0.1:5000/professor_questions")
            .then((response) => response.json())
            .then((data) => setQuestions(data.questions))
            .catch(() => setError("Error al obtener las preguntas."));
        })
        .catch(() => setError("Error al enviar las respuestas."));
    });
  };

  const uniqueProfessors = Array.from(new Set(professors.map((a) => a.professor_id)))
    .map((id) => professors.find((a) => a.professor_id === id));

  return (
    <Container className="my-5">
      <style>
        {`
          .card {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out;
            background-color: #f7f9fc;
            border: 2px solid #007bff;
            min-height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .card:hover {
            transform: translateY(-8px);
            border-color: #0056b3;
          }
          .card-header {
            background: #007bff;
            color: white;
            padding: 15px;
            font-size: 1.2rem;
            font-weight: bold;
          }
          .card-body {
            padding: 20px;
            flex-grow: 1;
          }
          .icon-text {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1rem;
            color: #6c757d;
          }
          .icon-text svg {
            color: #007bff;
          }
          .btn-primary {
            background-color: #007bff;
            border: none;
            transition: all 0.3s;
          }
          .btn-primary:hover {
            background-color: #0056b3;
          }
        `}
      </style>

      <h1 className="text-center text-primary mb-4">Lista de Profesores</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {uniqueProfessors.map((professor) => (
          <Col key={professor.professor_id}>
            <div className="card">
              <div className="card-header">{professor.name}</div>
              <div className="card-body">
                <StarRating rating={professor.overall_rating} />
                <div className="icon-text mt-3">
                  <FaUniversity />
                  {professor.university_name}
                </div>
                <div className="icon-text">
                  <FaBuilding />
                  {professor.campus_name}
                </div>
                <div className="icon-text">
                  <FaChalkboardTeacher />
                  {professor.department_name}
                </div>
                <Button
                  className="mt-3 w-100"
                  onClick={() => handleShowModal(professor.professor_id)}
                >
                  Evaluar Profesor
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Evaluar Profesor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {questions.map((question) => (
            <Form.Group key={question.question_id}>
              <Form.Label>{question.question_text}</Form.Label>
              <Form.Control
                as="select"
                value={answers[question.question_id] || ""}
                onChange={(e) => handleAnswerChange(question.question_id, parseInt(e.target.value))}
              >
                <option value="">Selecciona una opción</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </Form.Control>
            </Form.Group>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
          <Button variant="primary" onClick={handleSubmit}>Enviar Respuestas</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProfessorPage;
