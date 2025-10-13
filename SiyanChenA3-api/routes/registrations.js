import express from "express";
import { db } from "../event_db.js";

const router = express.Router();

/**
 * 创建报名记录
 */
router.post("/", (req, res) => {
  const { event_id, user_name, contact, tickets } = req.body;
  if (!event_id || !user_name || !tickets)
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields." });

  const sql = `
    INSERT INTO registrations (event_id, user_name, contact, tickets, registered_at)
    VALUES (?, ?, ?, ?, NOW())
  `;
  db.query(sql, [event_id, user_name, contact, tickets], (err) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: "Registration successful." });
  });
});

export default router;
