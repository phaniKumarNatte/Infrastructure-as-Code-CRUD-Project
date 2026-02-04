const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

/* CREATE */
router.post('/create', async (req, res) => {
  try {
    const { name, email, mobile_number } = req.body;
    const db = await getConnection();

    const [result] = await db.execute(
      'INSERT INTO users (name, email, mobile_number) VALUES (?, ?, ?)',
      [name, email, mobile_number]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Create failed' });
  }
});

/* READ */
router.get('/read', async (req, res) => {
  try {
    const db = await getConnection();
    const [rows] = await db.execute('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Read failed' });
  }
});

/* UPDATE */
router.put('/update', async (req, res) => {
  try {
    const { id, name, email, mobile_number } = req.body;
    const db = await getConnection();

    await db.execute(
      'UPDATE users SET name=?, email=?, mobile_number=? WHERE id=?',
      [name, email, mobile_number, id]
    );

    res.json({ message: 'Updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});

/* DELETE */
router.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const db = await getConnection();

    await db.execute('DELETE FROM users WHERE id=?', [id]);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;
