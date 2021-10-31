const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const {  priority } = require('../config/taskpriority');
/*
taskName
taskDescription
taskDeadline: date
taskPriority:[high,medium,low]
isTaskComplete: [incomplete,complete]



*/

const taskSchema = mongoose.Schema(
  {
      taskName:{
        type: String,
        required: true,

      },
      taskDescription:{
        type: String,
        required: true,
      },
      taskPriority: {
        type: String,
        enum: priority,
        default: 'Medium',
      },
      isTaskComplete: {
        type: Boolean,
        default: false,
      },
      taskCreatedBy:{
        type: String,
        required: true
      },
      deadline:{
        type: Date,
        default: new Date()
      }
  
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);


/**
 * @typedef Task
 */
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
