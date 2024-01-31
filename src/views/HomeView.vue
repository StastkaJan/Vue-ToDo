<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'

import TodoList from '@/components/TodoList.vue'

import type { taskListType } from '../types/listType'

const taskList = ref<taskListType>([])
let id = ref(2)
let newTaskName = ref('')

onBeforeMount(async () => {
  const localData = localStorage.getItem('taskList')

  if (localData == null) return

  taskList.value = await JSON.parse(localData)
  id.value = taskList.value[taskList.value.length - 1].id + 1
})

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

const removeCompleted = () => {
  taskList.value = taskList.value.filter(val => val.completed === false)
}

const completeAll = () => {
  for (const item of taskList.value) {
    item.completed = true
  }
}

watch(
  taskList,
  () => {
    localStorage.setItem('taskList', JSON.stringify(taskList.value))
  },
  { deep: true }
)
</script>

<template>
  <main>
    <form @submit.prevent="addTask">
      <label for="newTask">Task name: </label>
      <br />
      <input type="text" name="newTask" id="newTask" v-model="newTaskName" placeholder="Clean kitchen">
      <button class="block">Add</button>
    </form>

    <div class="buttons">
      <button @click="removeCompleted">
        Remove completed
      </button>
      <button @click="completeAll">
        Complete all
      </button>
    </div>

    <TodoList v-model="taskList" />
  </main>
</template>

<style scoped>
main {
  max-width: 1280px;
  min-height: 60vh;
  margin: auto;
}

form {
  margin-bottom: 20px;
}

button:hover {
  box-shadow: 0 .2em .5em #ccc;
}

form button {
  color: var(--back-color);
  background-color: var(--prim-color);
  border: 1px solid var(--prim-color);
}

div.buttons {
  margin-bottom: 20px;
}
</style>