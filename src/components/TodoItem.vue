<script setup lang="ts">
import CheckIcon from '@/components/icons/CheckIcon.vue'
import CrossIcon from '@/components/icons/CrossIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

import type { taskItemType } from '../types/listType'

const { item } = defineProps<{ item: taskItemType }>()

defineEmits<{
  (e: 'completeTask', id: number): void
  (e: 'deleteTask', id: number): void
}>()
</script>

<template>
  {{ item.name }} {{ item.completed ? '(completed)' : '' }}
  <div>
    <button @click="$emit('completeTask', item.id)">
      <CheckIcon v-if="!item.completed" />
      <CrossIcon v-else />
    </button>
    <button @click="$emit('deleteTask', item.id)">
      <DeleteIcon />
    </button>
  </div>
</template>

<style scoped>
button:hover {
  box-shadow: 0 .2em .5em #ccc;
}
</style>