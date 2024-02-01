import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TodoItem from '../TodoItem.vue'

describe('TodoItem', () => {
  it('renders correctly', () => {
    const wrapper = mount(TodoItem, {
      props: { item: { id: 1, name: 'task name', completed: false } }
    })

    expect(wrapper.text()).toContain('task name')
  })

  it('incompleted item', () => {
    const wrapper = mount(TodoItem, {
      props: { item: { id: 1, name: 'task name', completed: false } }
    })

    expect(wrapper.text()).not.toContain('(completed)')
  })

  it('completed item', () => {
    const wrapper = mount(TodoItem, {
      props: { item: { id: 1, name: 'task name', completed: true } }
    })

    expect(wrapper.text()).toContain('(completed)')
  })
})
