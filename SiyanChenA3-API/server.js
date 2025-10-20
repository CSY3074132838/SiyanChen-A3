import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './event_db.js';
import eventsRouter from './routes/events.js';
import categoriesRouter from './routes/categories.js';
import registrationsRouter from './routes/registrations.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routers
app.use('/api/events', eventsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/registrations', registrationsRouter);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 AngularJS API running on http://localhost:${PORT}`));
