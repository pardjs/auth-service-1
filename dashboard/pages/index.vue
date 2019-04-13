<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="Users" icon="account">
        <nuxt-link to="users-list">Users</nuxt-link>
      </card>
      <card title="Roles" icon="account-multiple">
        Roles
      </card>
      <card title="Auth Points" icon="circle-edit-outline">
        Auth Points
      </card>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',

  components: {
    Card
  }
}
</script>
