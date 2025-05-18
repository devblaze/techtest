import React, { useState } from 'react';
import { House, Trait } from '../types/HouseTypeDefinitions';
import './HouseCard.css';

interface HouseCardProps {
  house: House;
}

const HouseCard: React.FC<HouseCardProps> = ({ house }) => {
  const [traitFilter, setTraitFilter] = useState<string>('');
  const [filteredTraits, setFilteredTraits] = useState<Trait[]>(house.traits);

  // Parse house colors for gradient
  const parseColors = (colors: string): string[] => {
    const defaultGradient = ['white', 'black'];
    if (!colors) return defaultGradient;

    // Extract colors from format like "Scarlet and gold" or "Blue and bronze"
    const colorParts = colors.split(' and ');
    if (colorParts.length === 2) {
      // Map color names to hex values for better appearance
      const colorMap: {[key: string]: string} = {
        'scarlet': '#FF2400',
        'gold': '#FFD700',
        'blue': '#0047AB',
        'bronze': '#CD7F32',
        'green': '#006400',
        'silver': '#C0C0C0',
        'yellow': '#FFD700',
        'black': '#000000',
        'white': '#FFFFFF'
      };

      return colorParts.map(color => {
        const colorName = color.trim().toLowerCase();
        return colorMap[colorName] || defaultGradient[0];
      });
    }

    return defaultGradient;
  };

  const colorArray = parseColors(house.houseColours);
  const colorBarStyle = {
    background: `linear-gradient(to right, ${colorArray[0]}, ${colorArray[1]})`
  };

  const handleTraitFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setTraitFilter(searchTerm);

    const filtered = house.traits.filter(trait =>
        trait.name.toLowerCase().includes(searchTerm)
    );

    setFilteredTraits(filtered);
  };

  return (
      <div className="house-card">
        <div className="color-bar" style={colorBarStyle}></div>
        <div className="card-content">
          <h2 className="house-name">{house.name}</h2>

          <div className="house-info">
            <div className="info-section">
              <h3>Founder</h3>
              <p>{house.founder}</p>
            </div>

            <div className="info-section">
              <h3>Animal</h3>
              <p>{house.animal}</p>
            </div>

            <div className="info-section">
              <h3>Element</h3>
              <p>{house.element}</p>
            </div>

            <div className="info-section">
              <h3>Ghost</h3>
              <p>{house.ghost}</p>
            </div>

            <div className="info-section">
              <h3>Common Room</h3>
              <p>{house.commonRoom}</p>
            </div>

            <div className="info-section">
              <h3>Colors</h3>
              <p>{house.houseColours}</p>
            </div>
          </div>

          <div className="details-container">
            <div className="traits-section">
              <h3>Traits</h3>
              <input
                  type="text"
                  placeholder="Search traits..."
                  value={traitFilter}
                  onChange={handleTraitFilter}
                  className="trait-search"
              />

              <ul className="traits-list">
                {filteredTraits.length > 0 ? (
                    filteredTraits.map(trait => (
                        <li key={trait.id} className="trait-item">
                          {trait.name}
                        </li>
                    ))
                ) : (
                    <p>No traits match your search.</p>
                )}
              </ul>
            </div>

            <div className="heads-section">
              <h3>Heads</h3>
              <ul className="heads-list">
                {house.heads.length > 0 ? (
                    house.heads.map(head => (
                        <li key={head.id} className="head-item">
                          {head.firstName} {head.lastName}
                        </li>
                    ))
                ) : (
                    <p>No house heads listed.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HouseCard;