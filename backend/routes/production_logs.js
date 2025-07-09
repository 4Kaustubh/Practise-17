const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// POST /api/production_logs
router.post('/', async (req, res) => {
    const {
        artisan_id,
        units_produced,
        hours_worked,
        materials_used,
        notes,
        production_date
    } = req.body;

    // Log the incoming request body for debugging
    console.log('POST /api/production_logs body:', req.body);

    const { data, error } = await supabase
        .from('production_logs')
        .insert([{
            artisan_id,
            units_produced,
            hours_worked,
            materials_used,
            notes,
            production_date,
            status: 'pending'
        }])
        .select()
        .single();

    if (error) {
        // Log the error for debugging
        console.error('Supabase insert error:', error);
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
});

// GET /api/production_logs?artisan_id=...
router.get('/', async (req, res) => {
    const { artisan_id } = req.query;
    if (!artisan_id) return res.status(400).json({ error: 'artisan_id required' });

    const { data, error } = await supabase
        .from('production_logs')
        .select('*')
        .eq('artisan_id', artisan_id)
        .order('production_date', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

module.exports = router;