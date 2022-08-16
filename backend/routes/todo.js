const express = require('express')
const { createTodo, getTodos, deleteTodo, getTodo, updateTodo } = require('../controllers/todoController')

const router = express.Router()

router.get('/', getTodos)

router.get('/:id', getTodo)

router.post('/', createTodo)

router.delete('/:id', deleteTodo)

router.put('/:id', updateTodo)

module.exports = router;