// routes/adminRoutes.js
const express = require('express');
const { Job, Admin } = require('../models'); // Adjust the path based on your project structure

const router = express.Router();

// Route for posting a job and its description by an admin
router.post('/postJob', async (req, res) => {
  try {
    // You may want to implement authentication middleware to verify if the user is an admin

    const { title, description, adminUsername } = req.body;

    // Find the admin by username
    const admin = await Admin.findOne({ where: { username: adminUsername } });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Create a new job associated with the admin
    const job = await Job.create({
      title,
      description,
      AdminId: admin.id,
    });

    return res.status(201).json(job);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
