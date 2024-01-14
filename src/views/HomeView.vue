<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'

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

watch(
  taskList,
  () => {
    localStorage.setItem('taskList', JSON.stringify(taskList.value))
  },
  { deep: true })
</script>

<template>
  <main>
    <form @submit.prevent="addTask">
      <label for="newTask">Task name: </label>
      <br />
      <input type="text" name="newTask" id="newTask" v-model="newTaskName" placeholder="Clean kitchen">
      <button>Add</button>
    </form>

    <TransitionGroup tag="ul">
      <li v-for="{ id, name, completed } in taskList" :key="id" :class="{ complete: completed }">
        {{ name }}
      </li>
    </TransitionGroup>
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

ul {
  padding: 0;
  list-style-type: none;
}
</style>