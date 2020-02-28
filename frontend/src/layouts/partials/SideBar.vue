<template>
  <a-layout-sider
    :trigger="null"
    collapsible
    v-model="collapsed"
    class="sider-menu"
  >
    <div class="sidebar__logo">
      <router-link to="/" class="nav-link">
        <div class="sidebar__logo--img">
        </div>
      </router-link>
      <div class="sidebar__logo--text">BaTu</div>
    </div>
    <a-menu theme="dark" :selectedKeys="selectedKeys" class="menu-auto">
      <a-menu-item key="/motel/">
        <router-link to="/motel" class="nav-link">
          <a-icon type="home"/>
          <span>{{ $t('nav.motel') }}</span>
        </router-link>
      </a-menu-item>

      <a-menu-item key="/room/">
        <router-link to="/room" class="nav-link">
          <a-icon type="car"/>
          <span>{{ $t('nav.room') }}</span>
        </router-link>
      </a-menu-item>

      <a-menu-item key="/service/">
        <router-link to="/service" class="nav-link">
          <a-icon type="credit-card"/>
          <span>{{ $t('nav.service') }}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'LayoutSideBar',
    data () {
      return {
        mode: 'inline',
        selectedKeys: [],
      }
    },
    created () {
      this.updateMenu()
    },
    computed: {
      ...mapState('app', { collapsed: 'collapsedSideBar' }),
    },
    methods: {
      updateMenu () {
        const routes = this.$route.matched.concat()
        this.selectedKeys = [routes.pop().path]
      }
    },
    watch: {
      '$route' (val) {
        this.updateMenu()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sidebar__logo {
    background: #002140;
  }
  .ant-layout-sider-collapsed {
    .sidebar__logo--text {
      opacity: 0;
    }
  }
  .menu-auto {
    height: calc(100vh - 64px);
    overflow: auto;
  }
  .sider-menu {
    left: 0;
    z-index: 10;
  }
  .sider .ant-layout-sider-children {
    overflow-y: hidden;
  }
</style>
