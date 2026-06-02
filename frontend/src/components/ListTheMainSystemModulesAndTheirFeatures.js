import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import styles from './ListTheMainSystemModulesAndTheirFeatures.module.css';

/**
 * List the main system modules and their features
 *
 * @returns {JSX.Element} The JSX element for the component
 */
const ListTheMainSystemModulesAndTheirFeatures = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [systemModules, setSystemModules] = useState([]);
  const [studentFeatures, setStudentFeatures] = useState({
    moduleName: '',
    features: '',
  });

  useEffect(() => {
    const fetchSystemModules = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/system-modules');
        setSystemModules(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSystemModules();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await apiClient.post('/student-features', studentFeatures);
      setStudentFeatures(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudentFeatures((prevFeatures) => ({ ...prevFeatures, [name]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Main System Modules and their Features</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Module Name:
          <input
            type="text"
            name="moduleName"
            value={studentFeatures.moduleName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Features:
          <textarea
            name="features"
            value={studentFeatures.features}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {systemModules.map((module, index) => (
          <li key={index}>
            {module.name} - {module.features}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTheMainSystemModulesAndTheirFeatures;