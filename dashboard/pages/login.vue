<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">Login</h2>
    <b-field>
      <b-input v-model="username" placeholder="User Name"> </b-input>
    </b-field>

    <b-field>
      <b-input
        v-model="password"
        type="password"
        placeholder="Password"
        password-reveal
      >
      </b-input>
    </b-field>

    <b-button @click="doLogin()">Login</b-button>
  </section>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    doLogin() {
      this.login({
        username: this.username,
        password: this.password
      })
    },
    ...mapMutations({
      login: 'users/login'
    })
  }
}
</script>
