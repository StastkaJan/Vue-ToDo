<script setup lang="ts">
import { ref, computed, onBeforeMount, watch } from 'vue'
import CheckIcon from '@/components/icons/CheckIcon.vue'
import CrossIcon from '@/components/icons/CrossIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

type taskListType = Array<{
  id: number
  name: string
  completed: boolean
}>

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

const completeTask = (id: number) => {
  for (const item of taskList.value) {
    if (item.id === id) item.completed = !item.completed
  }
}

const deleteTask = (id: number) => {
  taskList.value = taskList.value.filter(val => val.id !== id)
}

const completedTasks = computed(() =>
  taskList.value.filter(val => val.completed)
)
const nonCompletedTasks = computed(() =>
  taskList.value.filter(val => !val.completed)
)

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
      <button class="block">Add</button>
    </form>

    <TransitionGroup name="list" tag="ul">
      <template v-for="list in [nonCompletedTasks, completedTasks]">
        <li v-for="{ id, name, completed } in list" :key="id" :class="{ complete: completed }">
          {{ name }}
          {{ completed ? '(complete)' : '' }}
          <div>
            <button @click="() => completeTask(id)">
              <CheckIcon v-if="!completed" />
              <CrossIcon v-else />
            </button>
            <button @click="() => deleteTask(id)">
              <DeleteIcon />
            </button>
          </div>
        </li>
      </template>
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

form button {
  color: var(--back-color);
  background-color: var(--prim-color);
  border: 1px solid var(--prim-color);
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li.complete {
  color: gray;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>