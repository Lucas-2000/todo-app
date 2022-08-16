const Todo = require('../models/todoModel')
const mongoose= require('mongoose')

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({createdAt: -1})
    res.status(200).json(todos)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


const getTodo = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such todo'})
  }
  
  const todo = await Todo.findById(id)

  if (!todo) {
    return res.status(404).json({error: 'No such todo'})
  }

  res.status(200).json(todo)
}

const createTodo = async (req, res) => {
  const { title, description } = req.body

  try {
    const workout = await Todo.create({title, description})
    res.status(200).send(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteTodo = async (req, res) => {
  const { id } = req.params
  
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such todo'})
  }

  const todo = await Todo.findOneAndDelete({_id: id})

  if (!todo) {
    return res.status(404).json({error: 'No such todo'})
  }

  res.status(200).json(todo)
}

const updateTodo = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such todo'})
  }
  
  const todo = await Todo.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!todo) {
    return res.status(404).json({error: 'No such todo'})
  }

  res.status(200).json(todo)
}

module.exports = { getTodos, getTodo, createTodo, deleteTodo, updateTodo }