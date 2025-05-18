"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Wizard World API URL
const WIZARD_API_URL = 'https://wizard-world-api.herokuapp.com/houses';
// Routes
app.get('/api/houses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const response = yield axios_1.default.get(WIZARD_API_URL);
        let houses = response.data;
        // Filter houses by name if query parameter is provided
        if (name && typeof name === 'string') {
            houses = houses.filter(house => house.name.toLowerCase().includes(name.toLowerCase()));
        }
        return res.json(houses);
    }
    catch (error) {
        console.error('Error fetching houses:', error);
        return res.status(500).json({ error: 'Failed to fetch houses data' });
    }
}));
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
