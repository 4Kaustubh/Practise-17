// server.js
const express = require('express');
require('dotenv').config();
const supabase = require('./supabaseClient');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Backend is running!');
});


app.get('/test-supabase', async (req, res) => {
    const { data, error } = await supabase.from('documents').select('*');
    if (error) return res.status(500).json({ error });
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
