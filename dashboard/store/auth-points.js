export const state = () => ({
  list: []
})

export const mutations = {
  fetch() {
    const token = window.localStorage.getItem('accessToken')
    if (!token) {
      return this.$router.push('/login')
    }
    this.$axios
      .get('auth-points', {
        params: { access_token: token }
      })
      .then(res => {
        state.list = res.data.data
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
