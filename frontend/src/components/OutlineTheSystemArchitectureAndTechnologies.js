import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

/**
 * Component to outline the system architecture and technologies used.
 */
const OutlineTheSystemArchitectureAndTechnologies = () => {
  // State management for form fields and API responses
  const [story, setStory] = useState({
    title: '',
    description: '',
  });

  const [systemArchitecture, setSystemArchitecture] = useState({
    technologies: [],
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Data fetching on mount
  useEffect(() => {
    const fetchSystemArchitecture = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/system-architecture');
        setSystemArchitecture(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSystemArchitecture();
  }, []);

  // Form submission handling
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await apiClient.post('/story', story);
      setStory({ ...story, id: response.data.id });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Form inputs or data display based on the story
  return (
    <div className="container">
      <h1>System Architecture and Technologies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={story.title}
                onChange={(event) => setStory({ ...story, title: event.target.value })}
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={story.description}
                onChange={(event) => setStory({ ...story, description: event.target.value })}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
          <h2>System Architecture:</h2>
          <ul>
            {systemArchitecture.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default OutlineTheSystemArchitectureAndTechnologies;