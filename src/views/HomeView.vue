<script setup lang="ts">
import { ref } from 'vue'

type taskListType = Array<{
  id: number
  name: string
  completed: boolean
}>

const taskList = ref<taskListType>([{
  id: 1,
  name: 'Clean kitchen',
  completed: false
}])

let id = ref(2)

let newTaskName = ref('')

const addTask = () => {
  if (newTaskName.value.length < 1) return

  taskList.value.push({
    id: id.value,
    name: newTaskName.value || '',
    completed: false
  })

  id.value++
  newTaskName.value = ''
}
</script>

<template>
  <main>
    <form @submit.prevent="addTask">
      <label for="newTask">Task name: </label>
      <br />
      <input type="text" name="newTask" id="newTask" v-model="newTaskName" placeholder="Clean kitchen">
      <button>Add</button>
    </form>

    <ul>
      <li v-for="{ id, name, completed } in taskList" :key="id" :class="{ complete: completed }">
        {{ name }}
      </li>
    </ul>
  </main>
</template>

<style scoped>
ul {
  padding: 0;
  list-style-type: none;
}
</style>