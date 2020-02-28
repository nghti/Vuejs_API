<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <router-link
        :to="{ name: item.link }"
      >
        {{ item.name }}
      </router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    data () {
      return {
        breadcrumbList: []
      }
    },

    watch: {
      '$route' (val) {
        this.breadcrumbList = val.meta.breadcrumb
      }
    },

    created () {
      this.breadcrumbList = this.$route.meta.breadcrumb
    }
  }
</script>

<style lang="scss" scoped>
  .breadcrumb {
    font-size: 16px;
    font-weight: bold;
    a {
      color: white;
    }
  }
</style>
