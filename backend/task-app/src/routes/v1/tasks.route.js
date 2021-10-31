const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taskValidation = require('../../validations/task.validation');
const taskController = require('../../controllers/task.controller');

const router = express.Router();

router
    .route('/create')
    .post(auth('createTask'), validate(taskValidation.createTask), taskController.createTask);
//   .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);
router
    .route('/read')
    .get(auth('readTask'), validate(taskValidation.readTask), taskController.createTask);

router
    .route('/readAll')
    .get(auth('readAllTask'), validate(taskValidation.readAllTask), taskController.readAllTask);

router
    .route('/update/:taskID')
    .put(auth('updateTask'), validate(taskValidation.updateTask), taskController.updateTask);
router
    .route('/delete')
    .delete(auth('deleteTask'), validate(taskValidation.deleteTask), taskController.deleteTask);




module.exports = router;

