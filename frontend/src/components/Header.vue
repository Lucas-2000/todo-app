<template>
  <header class="container">
    <nav>
      <h1 class="title">Todo app</h1>
      <div class="menu">
        <router-link to="/">Todos</router-link>
        <router-link to="/new-todo">New todo</router-link>
      </div>
    </nav>
  </header>
</template>

<style>

.title {
  font-size: 1.5rem;
  color: #42b983;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  transition: 0.3s;
  text-transform: uppercase;
  font-size: 1rem;
}

nav a:hover {
  opacity: 0.7;
}

nav a.router-link-exact-active {
  background: #42b983;
  padding: 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
  color: #fff;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>