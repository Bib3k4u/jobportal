// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { DataTypes, Sequelize } = require('sequelize');
const cors = require('cors'); // Import the cors middleware

// Create Sequelize instance and connect to the database
const sequelize = new Sequelize('job_portal_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql', // Change this based on your database type
});

// Define Sequelize models
const Admin = sequelize.define('Admin', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
});

// Set up model associations
Admin.hasMany(Job);
Job.belongsTo(Admin);

// Initialize Express app
const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Use cors middleware
app.use(bodyParser.json());

// Route for posting a job and its description by an admin
app.post('/postJob', async (req, res) => {
  try {
    // You may want to implement authentication middleware to verify if the user is an admin

    const { title, description, adminUsername } = req.body;

    // Find or create admin by username
    const [admin, created] = await Admin.findOrCreate({
      where: { username: adminUsername },
    });

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

app.get('/jobs', async (req, res) => {
  try {
    // Fetch all jobs from the database
    const allJobs = await Job.findAll({ include: [Admin] });

    // Map jobs to a response format with card structure
    const jobCards = allJobs.map((job) => ({
      id: job.id,
      title: job.title,
      description: job.description,
      createdAt: job.createdAt,
      postedBy: job.Admin.username,
    }));

    return res.json(jobCards);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// server.js (Express.js example)
app.get('/jobs/:id', async (req, res) => {
  try {
    const jobId = req.params.id;

    // Fetch job details from the database using the job ID
    const jobDetails = await Job.findOne({ where: { id: jobId }, include: [Admin] });

    if (!jobDetails) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Map job details to the desired response format
    const jobResponse = {
      id: jobDetails.id,
      title: jobDetails.title,
      description: jobDetails.description,
      postedBy: jobDetails.Admin.username,
      createdAt: jobDetails.createdAt,
    };

    return res.json(jobResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Sync Sequelize models with the database
// Sync Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced.');

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

