import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { Table, Button, Modal, Form, Container, Row, Col, ButtonGroup, Pagination } from 'react-bootstrap';

/**
 * Component for managing benefits
 */
const Benefitss = () => {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [benefitToEdit, setBenefitToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  /**
   * Fetch benefits from API on mount
   */
  useEffect(() => {
    const fetchBenefits = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/benefits');
        setBenefits(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBenefits();
  }, []);

  /**
   * Handle search input change
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Handle search button click
   */
  const handleSearchClick = () => {
    // implement search logic here
  };

  /**
   * Handle pagination change
   */
  const handlePageChange = (event) => {
    setCurrentPage(event.target.textContent);
  };

  /**
   * Handle create button click
   */
  const handleCreateClick = () => {
    setShowModal(true);
    setBenefitToEdit(null);
  };

  /**
   * Handle edit button click
   */
  const handleEditClick = (benefit) => {
    setShowModal(true);
    setBenefitToEdit(benefit);
  };

  /**
   * Handle delete button click
   */
  const handleDeleteClick = async (benefitId) => {
    try {
      await apiClient.delete(`/benefits/${benefitId}`);
      const updatedBenefits = benefits.filter((benefit) => benefit.id !== benefitId);
      setBenefits(updatedBenefits);
    } catch (error) {
      setError(error.message);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const benefitData = Object.fromEntries(formData.entries());
    try {
      if (benefitToEdit) {
        // update existing benefit
        await apiClient.put(`/benefits/${benefitToEdit.id}`, benefitData);
        const updatedBenefits = benefits.map((benefit) => (benefit.id === benefitToEdit.id ? benefitData : benefit));
        setBenefits(updatedBenefits);
      } else {
        // create new benefit
        const response = await apiClient.post('/benefits', benefitData);
        setBenefits([...benefits, response.data]);
      }
      setShowModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  /**
   * Render data table
   */
  const renderDataTable = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Error: {error}</p>;
    }
    return (
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {benefits
            .filter((benefit) => benefit.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((benefit) => (
              <tr key={benefit.id}>
                <td>{benefit.id}</td>
                <td>{benefit.name}</td>
                <td>{benefit.description}</td>
                <td>
                  <ButtonGroup>
                    <Button variant="success" onClick={() => handleEditClick(benefit)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteClick(benefit.id)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  };

  /**
   * Render pagination
   */
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(benefits.length / itemsPerPage); i++) {
      pages.push(i);
    }
    return (
      <Pagination>
        {pages.map((page) => (
          <Pagination.Item key={page} active={page === currentPage} onClick={handlePageChange}>
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Benefits</h1>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleCreateClick}>
            Create Benefit
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" required />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="danger" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonGroup>
            <Button variant="primary" onClick={handleSearchClick}>
              Search
            </Button>
            <Form.Control type="search" value={searchTerm} onChange={handleSearchChange} />
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          {renderDataTable()}
          {renderPagination()}
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{benefitToEdit ? 'Edit Benefit' : 'Create Benefit'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" required defaultValue={benefitToEdit ? benefitToEdit.name : ''} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" required defaultValue={benefitToEdit ? benefitToEdit.description : ''} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="danger" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Benefitss;