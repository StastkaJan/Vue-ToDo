<script setup lang="ts">
import { computed } from 'vue'

import TodoItem from './TodoItem.vue'

import type { taskListType } from '../types/listType'

const props = defineModel<taskListType>()

const completeTask = (id: number) => {
  for (const item of props.value || []) {
    if (item.id === id) item.completed = !item.completed
  }
}

const deleteTask = (id: number) => {
  props.value = props.value?.filter(val => val.id !== id)
}

const completedTasks = computed(() =>
  props.value?.filter(val => val.completed)
)
const nonCompletedTasks = computed(() =>
  props.value?.filter(val => !val.completed)
)
</script>

<template>
  <TransitionGroup name="list" tag="ul">
    <template v-for="list in [nonCompletedTasks, completedTasks]">
      <li v-for="item in list" :key="item.id" :class="{ complete: item.completed }">
        <TodoItem :item="item" @completeTask="completeTask" @deleteTask="deleteTask" />
      </li>
    </template>
  </TransitionGroup>
</template>

<style scoped>
ul {
  padding: 0;
  list-style-type: none;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .2em;
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