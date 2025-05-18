import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { House } from './types/HouseTypeDefinitions';
import HouseCard from './comnponents/HouseCardComponent';
import Spinner from './comnponents/SpinnerComponent';

function App() {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState<string>('');

  // API URL - will switch based on environment
  const API_URL = process.env.NODE_ENV === 'production'
      ? 'https://wizard-world-api.herokuapp.com/houses'
      : 'http://localhost:5001/api/houses';

  useEffect(() => {
    const fetchHouses = async () => {
      setLoading(true);
      try {
        const params = nameFilter ? { name: nameFilter } : {};
        const response = await axios.get<House[]>(API_URL, { params });
        setHouses(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching houses:', err);
        setError('Failed to fetch houses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay when filtering to avoid too many requests
    const timeoutId = setTimeout(() => {
      fetchHouses();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [nameFilter, API_URL]);

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  return (
      <div className="app-container">
        <header className="app-header">
          <h1>✨ Wizard World Houses ✨</h1>
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
                type="text"
                placeholder="Search for a magical house..."
                value={nameFilter}
                onChange={handleNameFilterChange}
                className="house-search"
            />
          </div>
        </header>

        <main className="houses-container">
          {loading ? (
              <Spinner />
          ) : error ? (
              <div className="error-message">
                <h3>Magical Mishap!</h3>
                <p>{error}</p>
              </div>
          ) : houses.length === 0 ? (
              <div className="no-results">
                <h3>No Magical Houses Found</h3>
                <p>Try a different search term or summon all houses by clearing the search.</p>
              </div>
          ) : (
              houses.map(house => (
                  <HouseCard key={house.id} house={house} />
              ))
          )}
        </main>
      </div>
  );
}

export default App;