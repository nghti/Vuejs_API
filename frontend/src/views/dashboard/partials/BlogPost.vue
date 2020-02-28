<template>
  <div>
    <h2>{{title}}</h2>
    <slot></slot>
    <div>
      <h2>Object</h2>
      {{getData}}
    </div>
    <button v-on:click="$emit('enlarge-text', 0.1)">Phong to</button>
  </div>
</template>
<script>
  export default {
    props: {
      title: [String],
      getData: {
        type: Array
      }
    }
  }
</script>
