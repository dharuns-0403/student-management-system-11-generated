import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { Container, Row, Col, Table, Form, Button, Modal, Spinner } from 'react-bootstrap';

/**
 * Students page component for managing students.
 */
function Students() {
  /**
   * State for managing loading state, error, and students data.
   */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({ name: '', email: '', phone: '' });
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  /**
   * Fetch students data on component mount.
   */
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await apiClient.get('/students');
        setStudents(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  /**
   * Handle form submission for creating or editing a student.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (idToDelete) {
        // Update student
        const response = await apiClient.put(`/students/${idToDelete}`, student);
        setStudents((prevStudents) => prevStudents.map((s) => (s.id === idToDelete ? response.data : s)));
        setIdToDelete(null);
      } else {
        // Create new student
        const response = await apiClient.post('/students', student);
        setStudents((prevStudents) => [...prevStudents, response.data]);
      }
      setShowModal(false);
      setStudent({ name: '', email: '', phone: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  /**
   * Handle delete button click.
   */
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/students/${id}`);
      setStudents((prevStudents) => prevStudents.filter((s) => s.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  /**
   * Render the students table.
   */
  const renderTable = () => {
    if (loading) {
      return <Spinner animation="border" role="status" />;
    }
    if (error) {
      return <div>Error: {error}</div>;
    }
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <Button variant="primary" onClick={() => setShowModal(true) && setStudent(student) && setIdToDelete(student.id)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(student.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  /**
   * Render the form for creating or editing a student.
   */
  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={student.name}
            onChange={(event) => setStudent((prevStudent) => ({ ...prevStudent, name: event.target.value }))} />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={student.email}
            onChange={(event) => setStudent((prevStudent) => ({ ...prevStudent, email: event.target.value }))} />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="phone"
            value={student.phone}
            onChange={(event) => setStudent((prevStudent) => ({ ...prevStudent, phone: event.target.value }))} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Students</h1>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Create Student
          </Button>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{idToDelete ? 'Edit Student' : 'Create Student'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {renderForm()}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {renderTable()}
        </Col>
      </Row>
    </Container>
  );
}

export default Students;