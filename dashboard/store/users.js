import { Toast } from 'buefy/dist/components/toast'

export const state = () => ({
  list: [],
  accessToken: ''
})

export const mutations = {
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
  },
  fetch(state) {
    this.$axios.get('users').then(res => {
      state.list = res.data.data
    })
  },
  async login(state, { username, password }) {
    try {
      const res = await this.$axios.post('login-by-username', {
        username,
        password
      })
      const data = res.data
      console.log(data)
      state.accessToken = data.token
      window.localStorage.setItem('accessToken', data.token)
      this.$router.push('/users-list')
    } catch (err) {
      console.error(err)
      const message = err.response
        ? err.response.data.error.message
        : err.message
      Toast.open('Login failed: ' + message)
    }
  }
}
