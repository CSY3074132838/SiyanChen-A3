import express from 'express';
import { db } from '../event_db.js';

const router = express.Router();
router.get("/search", (req, res) => {
  const { date, location, category } = req.query;
  let sql = `
    SELECT e.*, c.name AS category_name 
    FROM events e
    JOIN categories c ON e.category_id = c.id
    WHERE e.status = 'active'
  `;
  const params = [];

  // 动态拼接筛选条件
  if (date) {
    sql += " AND DATE(e.start_time) = ?";
    params.push(date);
  }
  if (location && location !== "undefined") {
    sql += " AND e.city LIKE ?";
    params.push(`%${location}%`);
  }
  if (category && category !== "undefined") {
    sql += " AND c.name LIKE ?";
    params.push(`%${category}%`);
  }

  db.query(sql, params, (err, data) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data });
  });
});
// 获取全部活动（含分类）
router.get('/', (req, res) => {
  const sql = `
    SELECT e.*, c.name AS category_name 
    FROM events e 
    JOIN categories c ON e.category_id = c.id
    WHERE e.status = 'active'
  `;
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data });
  });
});

// 获取单个活动及其注册列表
router.get('/:id', (req, res) => {
  const eventId = req.params.id;
  const eventSql = `SELECT * FROM events WHERE id = ?`;
  const regSql = `SELECT * FROM registrations WHERE event_id = ? ORDER BY registered_at DESC`;

  db.query(eventSql, [eventId], (err, eventData) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!eventData.length) return res.status(404).json({ success: false, message: 'Event not found' });

    db.query(regSql, [eventId], (err2, regData) => {
      if (err2) return res.status(500).json({ success: false, message: err2.message });
      res.json({ success: true, event: eventData[0], registrations: regData });
    });
  });
});

// 管理员：创建活动
router.post('/', (req, res) => {
  const { title, start_time, end_time, venue, city, category_id, goal_amount } = req.body;
  const sql = `
    INSERT INTO events (org_id,title, start_time, end_time, venue, city, category_id, goal_amount, status)
    VALUES (1,?, ?,  ?, ?, ?, ?, ?, 'active')
  `;
  db.query(sql, [title, start_time, end_time, venue, city, category_id, goal_amount], (err) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: 'Event created successfully' });
  });
});

// 管理员：更新活动
router.put('/:id', (req, res) => {
  const { id } = req.params;
  db.query('UPDATE events SET ? WHERE id = ?', [req.body, id], (err) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: 'Event updated successfully' });
  });
});

// 管理员：删除活动（若有注册则阻止）
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT COUNT(*) AS cnt FROM registrations WHERE event_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (result[0].cnt > 0) return res.status(400).json({ success: false, message: 'Cannot delete event with registrations' });
    db.query('DELETE FROM events WHERE id = ?', [id], err2 => {
      if (err2) return res.status(500).json({ success: false, message: err2.message });
      res.json({ success: true, message: 'Event deleted' });
    });
  });
});



export default router;
