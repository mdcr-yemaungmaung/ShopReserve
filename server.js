import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve static assets from project root
app.use(express.static(__dirname));

// Route root to shop app
app.get('/', (req, res) => {
  res.redirect('/shop/');
});

// Route /shop and subpaths
app.get('/shop', (req, res) => {
  res.redirect('/shop/');
});

app.get('/shop/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'shop', 'index.html'));
});

// Catch-all fallback
app.get('*', (req, res) => {
  res.redirect('/shop/');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ShopReserve server listening on http://0.0.0.0:${PORT}`);
});
