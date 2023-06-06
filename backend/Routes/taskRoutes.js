import Task from '../Model/taskModal.js';

import { Router } from 'express';

const router = new Router();

//Add Task
router.post('/', async (req, res) => {
  try {
    const findTask = await Task.findOne({ title: req.body.title });

    if (findTask) {
      res.status(409).json({
        message: 'Task already exists with given title',
      });
    } else {
      const newTask = new Task({ ...req.body });

      await newTask.save();

      res.status(200).json({
        message: 'Task Added Successfully',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Edit Task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updatedTask) {
      res.status(200).json({
        message: 'Updated Task Successfully',
      });
    } else {
      res.status(200).json({
        message: 'Task Not Updated',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Delete Task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Task has been deleted',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//View Task
router.get('/', async (req, res) => {
  try {
    const findTask = await Task.find();
    res.status(200).json({
      message: 'Task Detail',
      data: findTask,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//View All Tasks
router.get('/', async (req, res) => {
  const qCategory = req.query.category;
  try {
    let Tasks;

    if (qCategory) {
      Tasks = await Task.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      Tasks = await Task.find();
    }

    res.status(200).json({
      message: 'All Tasks Details',
      data: Tasks,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
