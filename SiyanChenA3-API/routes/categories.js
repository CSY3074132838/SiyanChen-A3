import express from 'express';
import { db } from '../event_db.js';
const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM categories', (err, data) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data });
  });
});

export default router;
