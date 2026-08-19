require('dotenv').config();
const express = require('express');
const cors = require('cors');

const extractTasksRoute = require('./routes/extractTasks');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'Ramble backend is running' });
});

app.use('/extract-tasks', extractTasksRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ramble backend running on port ${PORT}`);
});