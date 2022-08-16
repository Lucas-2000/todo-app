<template>
  <div class="container">
    <div class="todo-container">
      <div class="card" v-if="todos.length">
        <div class="form-card" v-for="todo in todos" :key="todo.id">
          <div class="form-title">
            <h2>{{ todo.title }}</h2>
          </div>
          <div class="form-details">
            <p v-if="todo.completed" class="strike">{{ todo.description }}</p>
            <p v-else>{{ todo.description }}</p>
            <div class="form-options">
              <input type="checkbox" @click="updateTodo(todo._id, todo.completed)" v-model="todo.completed">
              <button @click="deleteTodo(todo._id)" class="material-symbols-outlined">delete</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading Todos...</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TodosView',
    data() {
    return {
      todos: [],
      completed: false,
    }
  },
  methods: {
    async deleteTodo(id) {
      const response = await fetch('http://localhost:4000/todo/' + id, {
        method: 'DELETE'
      })
      const json = await response.json()

      if(!response.ok) {
        this.showAlert('Error in delete, try again')
      }

      if(response.ok) {
        this.showAlert(`Todo ${json.title} deleted`)
        location.reload()
      }
    },
    async updateTodo(id, complete) {
      this.completed = complete
      const completed = !this.completed
      const todo = { completed }

      const response = await fetch("http://localhost:4000/todo/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo)
      })
      const data = await response.json()

      if(!response.ok) {
        this.showAlert('Error in update status, try again')
      }
    },
    showAlert: (msg) => {
      alert(msg)
    }
  },
  mounted() {
    fetch('http://localhost:4000/todo')
      .then(res => res.json())
      .then(data => this.todos = data)
      .catch(err => console.log(err.message))
  }
}
</script>

<style>
.todo-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
}

.strike {
  text-decoration: line-through;
}

.card {
  background: #fff;
  border-radius: 0.25rem;
  padding: 1rem;
  margin: 1rem auto;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.05);
  width: 100%;
  height: max-content;
}

.form-card {
  margin-bottom: 1rem;
}

.form-card:not(:first-child) {
  border-top: solid 1px #e5e5e5;
}

.form-title {
  display: flex;
  align-items: center;
  margin: 0 2rem;
}

.form-title h2 {
  color: #42b983;
}

.form-title p {
  font-size: 1rem;
}

.form-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 2rem;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.form-options button {
  border-radius: 50%;
  border: none;
  background: transparent;
  padding: 0.5rem;
  transition: 0.3s;
  color: crimson;
}

.form-options button:hover {
  opacity: 0.7;
  background: #e7e7e7;
}

</style>