const express = require('express');
// Need express Router to handle each routes
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Exercise = require('../models/Exercise');

// @route   GET api/exercises
// @desc    Get all exercises
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const exercises = await Exercise.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(exercises);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/exercises
// @desc    Add new exercises
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('description', 'Description is required')
        .not()
        .isEmpty(),
      check('duration', 'Duration is require')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const description = req.body.description;
    const duration = Number(req.body.duration);

    try {
      const newExercise = new Exercise({
        description,
        duration,
        user: req.user.id
      });

      const exercise = await newExercise.save();

      res.json(exercise);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route  GET api/exercises/:id
// @desc   Get one exercises by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/exercises/:id
// @desc    Update exercises
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { description, duration, date } = req.body;

  // build exercise object
  const exerciseFields = {};
  // if one value exist inside the req.body, I replace the value inside the contactFields object with the value from the req.body
  if (description) exerciseFields.description = description;
  if (duration) exerciseFields.duration = duration;
  if (date) exerciseFields.date = date;

  try {
    // id come from to the https request, when we clicked on the contact we want to modify
    let exercise = await Exercise.findById(req.params.id);

    // if no exercise exist
    if (!exercise) return res.status(404).json({ msg: 'Exercise not found' });

    // Make sure user owns exercise
    // We access to req.user.id by the middleware auth
    if (exercise.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      { $set: exerciseFields },
      { new: true } // if the exercise not exist, then let's just create it
    );
    res.json(exercise);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/exercises/:id
// @desc    Delete exercise
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // id come from to the https request, when we clicked to the exercise we want to modify
    let exercise = await Exercise.findById(req.params.id);

    // if no exercise exist
    if (!exercise) return res.status(404).json({ msg: 'Exercise not found ' });

    // Make sur user owns exercise
    if (exercise.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // don't use findByIdAndDelete because its deprecated
    await Exercise.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Exercise removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
