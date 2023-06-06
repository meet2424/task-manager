import express from 'express';
import './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import taskRoutes from './Routes/taskRoutes.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use('/api/task', taskRoutes);

app.get('/api', async (req, res) => {
  res.send('connected to task-manager');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
