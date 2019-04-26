<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      Auth Points management
      <b-icon icon="rocket" size="is-large" />
    </h2>
    <b-table :data="$store.state.authPoints.list">
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>{{
          props.row.id
        }}</b-table-column>
        <b-table-column field="name" label="Name">{{
          props.row.name
        }}</b-table-column>
        <b-table-column field="displayName" label="Display Name">{{
          props.row.displayName
        }}</b-table-column>
        <b-table-column field="date" label="Created At" centered>
          <span class="tag is-success">{{
            new Date(props.row.createdAt).toLocaleDateString()
          }}</span>
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
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      data: [],
      ...mapState({
        list: 'authPoints/list'
      })
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    ...mapMutations({
      fetch: 'authPoints/fetch'
    })
  }
}
</script>
