<template>
  <!-- Page content -->
  <div class="page-404 position-relative">
    <!-- Content area -->
    <div class="content d-flex justify-content-center align-items-center">
      <!-- Error title -->
      <div class="text-center mb-3 box-center">
        <h1 class="error-title">404</h1>
        <h5 class="text-danger mb-20">お探しのページは見つかりませんでした。</h5>
        <router-link to="/">
          <button class="btn btn-wak text-white mb-15
                  wmin-160 wmin-md-222">
            ダッシュボード
          </button>
        </router-link>
      </div>
      <!-- /error title -->
    </div>
    <!-- /content area -->
  </div>
  <!-- /page content -->
</template>

<script>
  export default {
    name: 'PageNotFound'
  }
</script>
