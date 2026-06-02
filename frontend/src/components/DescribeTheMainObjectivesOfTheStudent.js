import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

/**
 * DescribeTheMainObjectivesOfTheStudent component displays the main objectives of the Student Management System.
 * It fetches data from the API and displays it in a form.
 */
const DescribeTheMainObjectivesOfTheStudent = () => {
  // State management for form fields and API responses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    objectives: '',
  });

  // Fetch data from the API on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/student-management-objectives');
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // API endpoint for submitting the form data
      const response = await apiClient.post('/student-management-objectives', data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Render the component
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Main Objectives of the Student Management System</h1>
      <p>{data.objectives}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Objectives:
          <textarea
            value={data.objectives}
            onChange={(event) => setData({ ...data, objectives: event.target.value })}
            rows={10}
            cols={50}
          />
        </label>
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default DescribeTheMainObjectivesOfTheStudent;