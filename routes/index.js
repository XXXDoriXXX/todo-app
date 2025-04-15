var express = require('express');
var router = express.Router();
const Task = require('../models/task');
router.get('/', async (req, res) =>{
  const tasks = await Task.find().lean();
  res.render('index', { title: 'TODO List', tasks });
});

router.post('/add', async (req, res) =>{
  const{title, description} = req.body;
  await Task.create({title, description});
    res.redirect('/');
})

router.post('/toggle/:id', async (req, res) =>{
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.redirect('/');
})

router.post('/delete/:id', async (req, res) =>{
  await Task.findByIdAndDelete(req.params.id);
  res.redirect('/');
})

module.exports = router;
