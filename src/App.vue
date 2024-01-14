<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import PageIcon from './components/icons/PageIcon.vue'
</script>

<template>
  <header>
    <RouterLink to="/">
      <PageIcon />
    </RouterLink>

    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>

  <RouterView />

  <footer>
    <p>&copy;{{ new Date().getFullYear() }} Jan Šťástka | By Jan Šťástka</p>
  </footer>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem;
}

header nav a {
  margin: 0 .1em;
  padding: .5em;
}

footer {
  padding: .5em;
  text-align: center;
}
</style>
