const express = require('express');
const Workout = require('../models/workout'); 
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find(); 
    res.render('workouts/index', { workouts });
  } catch (err) {
    res.status(500).send('Error fetching workouts');
  }
});

router.get('/new', (req, res) => {
  res.render('workouts/new');
});

router.post('/', async (req, res) => {
  try {
    const workout = new Workout(req.body); 
    await workout.save(); 
    res.redirect('/workouts');
  } catch (err) {
    res.status(400).send('Error creating workout');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    res.render('workouts/show', { workout }); 
  } catch (err) {
    res.status(404).send('Workout not found');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    res.render('workouts/edit', { workout }); 
  } catch (err) {
    res.status(404).send('Workout not found');
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Workout.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/workouts/${req.params.id}`); 
  } catch (err) {
    res.status(400).send('Error updating workout');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id); 
    res.redirect('/workouts'); 
  } catch (err) {
    res.status(500).send('Error deleting workout');
  }
});

module.exports = router;
