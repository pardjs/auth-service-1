<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      {{ title }} user
      <b-icon icon="rocket" size="is-large" />
    </h2>
    <section>
      <b-field label="Name">
        <b-input v-model="user.name"></b-input>
      </b-field>
      <b-field label="Login Name">
        <b-input v-model="user.username"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input v-model="user.password"></b-input>
      </b-field>
      <b-button type="is-primary" @click="save()">Save</b-button>
    </section>
  </section>
</template>
<script>
export default {
  data: function() {
    return {
      title: 'New',
      id: 'new',
      user: {
        name: '',
        username: '',
        password: ''
      }
    }
  },
  created() {
    if (this.$route.params.id !== 'new') {
      this.id = this.$route.params.id
      this.title = 'Edit'
      this.$axios.get('users/' + this.id).then(res => {
        this.user.username = res.data.username
        this.user.name = res.data.name
      })
    }
  },
  methods: {
    async save() {
      if (this.id === 'new') {
        await this.$axios.post('users', this.user)
      } else {
        const data = { ...this.user }
        if (!data.password) {
          delete data.password
        }
        await this.$axios.put('users/' + this.id, data)
      }
      this.$router.push('/users')
    }
  }
}
</script>
