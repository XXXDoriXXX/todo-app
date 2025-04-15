var express = require('express');
var router = express.Router();
const Task = require('../models/task');
const handleValidationError = require("../utils/handleValidationError");
router.get('/', async (req, res) =>{
  const tasks = await Task.find().lean();
  res.render('index', { title: 'TODO List', tasks });
});

router.post('/add', async (req, res) =>{
  try {
    await Task.create(req.body);
    res.redirect('/');
  } catch (err) {
    return handleValidationError(err, req, res, 'index');
  }
})

router.post('/toggle/:id', async (req, res) =>{
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.redirect('/');
  } catch (err) {
    return handleValidationError(err, req, res, 'index');
  }
})

router.post('/delete/:id', async (req, res) =>{
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    return handleValidationError(err, req, res, 'index');
  }
})

module.exports = router;
