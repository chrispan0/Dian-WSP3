var express = require('express');
var router = express.Router();
const Workout = require('../models/workout');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Workout Tracker' });
});

router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.render('workouts', { workouts });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/workouts/new', (req, res) => {
  res.render('form', { title: 'Add a Workout' });
});

router.post('/workouts', async (req, res) => {
  const { date, bodyPart, description } = req.body;
  try {
    const workout = new Workout({ date, bodyPart, description });
    await workout.save();
    res.redirect('/workouts');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/workouts/edit/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    res.render('form', { workout, title: 'Edit Workout' });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/workouts/:id', async (req, res) => {
  try {
    const { date, bodyPart, description } = req.body;
    await Workout.findByIdAndUpdate(req.params.id, { date, bodyPart, description });
    res.redirect('/workouts');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/workouts/:id', async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect('/workouts');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
