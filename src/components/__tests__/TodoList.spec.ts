import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TodoList from '../TodoList.vue'

describe('TodoItem', () => {
  it('renders correctly', () => {
    const wrapper = mount(TodoList, {
      props: {
        modelValue: [{ id: 1, name: 'task name', completed: false }]
      }
    })

    expect(wrapper.text()).toContain('task name')
  })

  it('incompleted item', () => {
    const wrapper = mount(TodoList, {
      props: {
        modelValue: [{ id: 1, name: 'task name', completed: false }]
      }
    })

    expect(wrapper.text()).not.toContain('(completed)')
  })

  it('completed item', () => {
    const wrapper = mount(TodoList, {
      props: {
        modelValue: [{ id: 1, name: 'task name', completed: true }]
      }
    })

    expect(wrapper.text()).toContain('(completed)')
  })

  it('renders multiple items', () => {
    const wrapper = mount(TodoList, {
      props: {
        modelValue: [
          { id: 1, name: 'task name 1', completed: true },
          { id: 2, name: 'task name 2', completed: false }
        ]
      }
    })

    console.log(wrapper.findAll('li'))

    expect(wrapper.findAll('li').length).toBe(2)
    expect(wrapper.find('li:last-of-type').text()).toBe('task name 1 (completed)')
    expect(wrapper.find('li:first-of-type').text()).toBe('task name 2')
  })
})
