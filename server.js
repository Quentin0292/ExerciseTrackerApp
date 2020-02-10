const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the Exercise Keeper API' });
});

// add routing
app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(`Serveur listening on port ${PORT}`));
