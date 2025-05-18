import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Types
interface Trait {
  id: string;
  name: string;
}

interface House {
  id: string;
  name: string;
  houseColours: string;
  founder: string;
  animal: string;
  element: string;
  ghost: string;
  commonRoom: string;
  heads: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
  traits: Trait[];
}

// Wizard World API URL
const WIZARD_API_URL = 'https://wizard-world-api.herokuapp.com/houses';

// Routes
app.get('/api/houses', async (req, res) => {
  try {
    const { name } = req.query;
    const response = await axios.get<House[]>(WIZARD_API_URL);
    
    let houses = response.data;
    
    // Filter houses by name if query parameter is provided
    if (name && typeof name === 'string') {
      houses = houses.filter(house => 
        house.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    
    return res.json(houses);
  } catch (error) {
    console.error('Error fetching houses:', error);
    return res.status(500).json({ error: 'Failed to fetch houses data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});