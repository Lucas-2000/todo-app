<template>
  <div class="container">
    <div class="todo-container">
      <div class="card">
        <form @submit.prevent="handleSubmit" class="form-card">
          <h1>New Todo</h1>
          <label for="title">Todo Title</label>
          <input type="text" name="title" id="title" v-model="title" required>
          <label for="description">Todo Description</label>
          <input type="text" name="description" id="description" v-model="description" required>
          <button>Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NewTodosView',
  data() {
    return {
      title: '',
      description: '',
    }
  },
  methods: {
    async handleSubmit() {
      const title = this.title
      const description = this.description
      const todo = { title, description }

      const response = await fetch("http://localhost:4000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo)
      })
      const data = await response.json()

      if(!response.ok){
        return this.showAlert("Error in creation, try again")
      }

      if(response.ok) {
        this.title = ""
        this.description = ""
        this.showAlert("Todo created")
        return data
      }
    },
    showAlert: (msg) => {
      alert(msg)
    }
  }
}
</script>

<style scoped>
.todo-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
}

.card {
  background: #fff;
  border-radius: 0.25rem;
  padding: 2rem;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.05);
  max-width: 450px;
  margin: 2rem auto;
  text-align: left;
}

label {
  display: block;
  font-size: 1.125rem;
  font-weight: bold;
}

input {
  padding: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  box-sizing: border-box;
  border: 4px solid #fff;
  background: #e7e7e7;
  transition: 0.3s;
}

input:focus {
  outline: none;
  border: 4px solid #42b983;
}

button {
  width: 100%;
  padding: 1rem 2rem;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  font-size: 1.25rem;
  font-weight: bold;
  transition: 0.3s;
}

button:hover {
  opacity: 0.7;
}
</style>
