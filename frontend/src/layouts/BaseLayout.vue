<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger">
      <side-bar-menu/>

      <a-layout class="container">
        <base-header/>
        <div class="content-auto">
<!--          <page-header/>-->
          <a-layout-content class="content-wrapper">
            <transition name="slide-right" mode="out-in">
              <router-view class="router-view"/>
            </transition>
          </a-layout-content>
        </div>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
  import BaseHeader from './partials/Header'
  import SideBarMenu from './partials/SideBar'
  // import PageHeader from '../components/PageHeader'

  export default {
    name: 'BaseLayout',
    components: {
      BaseHeader,
      // PageHeader,
      SideBarMenu
    },
    data () {
      return {
        collapsed: false,
      }
    },
  }
</script>
<style>
  .container {
    min-height: 100vh;
    width: 100%;
    padding: 12px;
    margin-right: auto;
  }
  .content-auto {
    background: white;
    margin-top: 64px;
    min-height: calc(100vh - 77px);
    padding: 12px;
  }
  .layout-footer {
    text-align: center;
    padding: 0 0 20px;
    font-weight: bold;
  }

  .router-view {
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
