<template>
  <div>
    <h2>service1</h2>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        title: 'hoang tu',
        post: {
          id: 1,
          title: 'My Journey with Vue'
        }
      }
    },
    mounted () {
      this.getUsers()
    },
    computed: {
      ...mapState('dashboard', { users: 'users' }),
    },
    methods: {
      ...mapActions('dashboard', ['getUsers']),
    },
  }
</script>

<style lang="scss" scoped>

</style>
