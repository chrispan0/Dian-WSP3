const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

app.use(express.urlencoded({ extended: true }));  
app.use(express.json());                        
app.use(methodOverride('_method'));              
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

const workoutsRouter = require('./routes/workouts');
app.use('/workouts', workoutsRouter);  


app.get('/', (req, res) => {
  res.render('index'); 
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
