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
          <b-button>Disable</b-button>
          <b-button>Edit Basic</b-button>
          <b-button>Edit Roles</b-button>
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
      fetch: 'auth-points/fetch'
    })
  }
}
</script>
