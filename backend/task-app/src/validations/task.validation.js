const Joi = require('joi');
const { password, objectId } = require('./custom.validation');
/*
taskName
taskDescription
taskDeadline: date
taskPriority:[high,medium,low]
isTaskComplete: [incomplete,complete]



*/

const createTask = {
    body: Joi.object().keys({
        taskName: Joi.string().alphanum()
            .min(3)
            .max(30).required(),
        taskDescription: Joi.string().required(),
        taskPriority: Joi.string(),
        isTaskComplete: Joi.string(),
        taskCreatedBy: Joi.string().required()


    }).with('taskName', 'taskDescription')
}

const readTask = {
    body: Joi.object().keys({
        taskID: Joi.string().alphanum().required()
    })
}

const readAllTask = {
    body: Joi.object().keys({
        userID: Joi.string().alphanum()
    })
}

const updateTask = {
    body: Joi.object().keys({
        taskName: Joi.string().alphanum()
            .min(3)
            .max(30).required(),
        taskDescription: Joi.string().required(),
        taskPriority: Joi.string(),
        isTaskComplete: Joi.boolean(),
        taskCreatedBy: Joi.string(),
        taskDeadline: Joi.date()



    }).with('taskName', 'taskDescription')
}





module.exports = {
    createTask,
    readTask,
    readAllTask,
    updateTask



};
