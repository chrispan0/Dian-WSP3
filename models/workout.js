const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
  },
  duration: {
    type: Number,
    required: true,  
  },
  intensity: {
    type: String,
    required: true, 
  },
  notes: {
    type: String,
    default: '', 
  }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
