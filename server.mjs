import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Now this will work ✅
const frontendPath = path.join(__dirname, 'frontend', 'dist');
console.log('Serving frontend from:', frontendPath);

app.use(express.static(frontendPath));

// API Endpoint Example
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Catch-all to serve the frontend for unknown routes (React/Vue/SPA support)
app.get('*', (req, res) => {
  const indexPath = path.join(frontendPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend not found');
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
