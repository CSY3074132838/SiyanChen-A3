import express from 'express';
import cors from 'cors';
import events from './routes/events.js';
import regs from './routes/registrations.js';

const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/events',events);
app.use('/api/events/:id/registrations',regs);
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({error:'Server error'});});
app.listen(process.env.PORT||3000,()=>console.log('API running'));
