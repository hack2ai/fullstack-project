const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Flask backend URL — uses Docker service name in production
const FLASK_BACKEND_URL = process.env.FLASK_BACKEND_URL || 'http://backend:5000';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Routes ────────────────────────────────────────────────────────────────────

// Home — render the registration form
app.get('/', (req, res) => {
  res.render('index', { title: 'Student Registration', error: null, success: null });
});

// Handle form submission → forward to Flask backend
app.post('/submit', async (req, res) => {
  const formData = {
    name: req.body.name,
    email: req.body.email,
    course: req.body.course,
    year: req.body.year,
    message: req.body.message
  };

  try {
    const response = await axios.post(`${FLASK_BACKEND_URL}/submit`, formData, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000
    });

    res.render('index', {
      title: 'Student Registration',
      error: null,
      success: response.data.message
    });
  } catch (err) {
    const errMsg =
      err.response?.data?.error ||
      err.message ||
      'Something went wrong. Please try again.';

    res.render('index', {
      title: 'Student Registration',
      error: errMsg,
      success: null
    });
  }
});

// View all submissions (proxy to Flask)
app.get('/submissions', async (req, res) => {
  try {
    const response = await axios.get(`${FLASK_BACKEND_URL}/submissions`, { timeout: 5000 });
    res.render('submissions', {
      title: 'All Submissions',
      data: response.data
    });
  } catch (err) {
    res.render('submissions', {
      title: 'All Submissions',
      data: { count: 0, submissions: [], error: 'Could not reach backend.' }
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Node.js frontend' });
});

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅  Frontend running at http://localhost:${PORT}`);
  console.log(`🔗  Flask backend → ${FLASK_BACKEND_URL}`);
});
