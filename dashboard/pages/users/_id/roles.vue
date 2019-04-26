<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      Set {{ user.name }}( {{ user.username }} )'s Roles
      <b-icon icon="rocket" size="is-large" />
    </h2>
    <b-checkbox v-for="role in roles" :key="role.id" v-model="roleIds" native-value="Flint">
      {{ role.name }}
    </b-checkbox>
  </section>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      userId: 0,
      user: {
        username: '',
        name: ''
      },
      roleIds: [],
      ...mapState({
        roles: 'roles/list'
      })
    }
  },
  async created() {
    this.userId = this.$route.params.id
    if (isNaN(parseInt(this.userId, 10))) {
      this.$router.push('/users')
    }
    try {
      const res = await this.$axios.get('users/' + this.userId)
      if (!res.data) {
        throw new Error('User not found')
      }
      this.user.name = res.data.name
      this.user.username = res.data.username
      this.roleIds = res.data.roles.map(role => role.id)
      this.fetch()
    } catch (err) {
      this.$snackbar.open({
        message: err.message,
        onAction: () => {
          this.$router.push('/users')
        }
      })
    }
  },
  methods: {
    ...mapMutations({
      fetch: 'roles/fetch'
    })
  }
}
</script>
