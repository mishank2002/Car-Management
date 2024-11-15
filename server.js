const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/UserRoutes');
const carRoutes = require('./routes/carRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
