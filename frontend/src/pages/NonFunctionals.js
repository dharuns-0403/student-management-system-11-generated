import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { Button, Form, Modal, Table, Row, Col, Container } from 'react-bootstrap';

/**
 * NonFunctionals page component
 */
function NonFunctionals() {
  // State for non-functionals list, form, and loading state
  const [nonFunctionals, setNonFunctionals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedNonFunctional, setEditedNonFunctional] = useState(null);
  const [newNonFunctional, setNewNonFunctional] = useState({
    name: '',
    description: '',
  });

  // Fetch non-functionals on mount
  useEffect(() => {
    fetchNonFunctionals();
  }, []);

  // Fetch all non-functionals from API
  const fetchNonFunctionals = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/non-functionals');
      setNonFunctionals(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Create new non-functional
  const createNonFunctional = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post('/non-functionals', newNonFunctional);
      setNonFunctionals([...nonFunctionals, response.data]);
      setNewNonFunctional({
        name: '',
        description: '',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Edit non-functional
  const editNonFunctional = async (nonFunctional) => {
    setEditing(true);
    setEditedNonFunctional(nonFunctional);
    setNewNonFunctional({
      name: nonFunctional.name,
      description: nonFunctional.description,
    });
  };

  // Update non-functional
  const updateNonFunctional = async () => {
    setLoading(true);
    try {
      const response = await apiClient.put(`/non-functionals/${editedNonFunctional.id}`, newNonFunctional);
      const updatedNonFunctionals = nonFunctionals.map((nf) => (nf.id === response.data.id ? response.data : nf));
      setNonFunctionals(updatedNonFunctionals);
      setEditing(false);
      setEditedNonFunctional(null);
      setNewNonFunctional({
        name: '',
        description: '',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete non-functional
  const deleteNonFunctional = async (id) => {
    setLoading(true);
    try {
      await apiClient.delete(`/non-functionals/${id}`);
      const updatedNonFunctionals = nonFunctionals.filter((nf) => nf.id !== id);
      setNonFunctionals(updatedNonFunctionals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Search non-functionals
  const searchNonFunctionals = (searchTerm) => {
    const filteredNonFunctionals = nonFunctionals.filter((nf) =>
      nf.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setNonFunctionals(filteredNonFunctionals);
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col>
          <h1>NonFunctionals</h1>
        </Col>
        <Col>
          <Button variant="primary" onClick={() => setEditing(true)}>
            Create New NonFunctional
          </Button>
        </Col>
      </Row>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {nonFunctionals.map((nonFunctional) => (
            <tr key={nonFunctional.id}>
              <td>{nonFunctional.id}</td>
              <td>{nonFunctional.name}</td>
              <td>{nonFunctional.description}</td>
              <td>
                <Button variant="warning" onClick={() => editNonFunctional(nonFunctional)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deleteNonFunctional(nonFunctional.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={editing} onHide={() => setEditing(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editedNonFunctional ? 'Edit NonFunctional' : 'Create New NonFunctional'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={newNonFunctional.name}
                onChange={(e) => setNewNonFunctional({ ...newNonFunctional, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newNonFunctional.description}
                onChange={(e) => setNewNonFunctional({ ...newNonFunctional, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditing(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={editedNonFunctional ? updateNonFunctional : createNonFunctional}>
            {editedNonFunctional ? 'Update' : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="search">
            <Form.Label>Search:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search non-functionals..."
              onChange={(e) => searchNonFunctionals(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {nonFunctionals.length} non-functionals found.
        </p>
      )}
    </Container>
  );
}

export default NonFunctionals;