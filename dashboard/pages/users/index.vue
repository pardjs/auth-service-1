<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      Users management
      <b-icon icon="rocket" size="is-large" />
    </h2>
    <b-table :data="$store.state.users.list">
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>{{
          props.row.id
        }}</b-table-column>
        <b-table-column field="name" label="Name">{{
          props.row.name
        }}</b-table-column>
        <b-table-column field="username" label="Username">{{
          props.row.username
        }}</b-table-column>
        <b-table-column field="date" label="Created At" centered>
          <span class="tag is-success">{{
            new Date(props.row.createdAt).toLocaleDateString()
          }}</span>
        </b-table-column>
        <b-table-column label="Actions">
          <b-button
            size="is-small"
            type="is-danger"
            @click="doDelete(props.row)"
            >Delete</b-button
          >
          <b-button size="is-small" type="is-info" @click="goEdit(props.row)"
            >Edit</b-button
          >
          <b-button
            size="is-small"
            type="is-warning"
            @click="goSetRoles(props.row)"
            >Set Roles</b-button
          >
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"></b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>
    </b-table>
    <b-button class="btn-create" type="is-primary" @click="goCreate()"
      >Create a new User</b-button
    >
  </section>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    ...mapMutations({
      fetch: 'users/fetch',
      remove: 'users/remove'
    }),
    doDelete(user) {
      this.$dialog.confirm({
        message: 'Continue on this task?',
        onConfirm: () => {
          this.remove(user)
        }
      })
    },
    goEdit(user) {
      this.$router.push(`/users/${user.id}/form`)
    },
    goSetRoles(user) {
      this.$router.push(`/users/${user.id}/roles`)
    },
    goCreate() {
      this.$router.push('/users/new/form')
    }
  }
}
</script>
<style>
.btn-create {
  margin-top: 10px;
}
</style>
