<template>
  <div>
    <base-search/>
    <a-list :grid="{ gutter: 16, xs: 3 }" :dataSource="users">
      <a-list-item slot="renderItem" slot-scope="item">
        <div class="item__img">
          <img class="item__img--fix" :src="item.img" alt="">
        </div>
        <a-card>
          <h4>{{item.title}}</h4>
          <span>{{item.money}}</span>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import BaseSearch from '../../components/Search'

  export default {
    components: {
      BaseSearch
    },
    data () {
      return {

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
  .cart {
    &__title {
      font-size: 20px;
    }
    &__text {
      font-size: 20px;
      color: #bdbdbd;
      padding: 12px 0;
    }
  }
  .item__img {
    height: 200px;
    &--fix {
      margin-right: auto;
      margin-left: auto;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .ant-card {
    /*background: transparent;*/
    /*color: white;*/
  }
  .ant-card-body {
    padding: 12px;
  }
  .ant-card-bordered {
    border: 1px solid #7c7c7c;
  }
</style>
