export const state = () => ({
  list: []
})

export const mutations = {
  fetch(state) {
    this.$axios.get('auth-points').then(res => {
      state.list = res.data.data
      console.log(state.list)
    })
  },
  add(state, text) {
    state.list.push({
      text: text,
      done: false
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
