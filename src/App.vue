<template>
  <div id="app">
    <gd-header></gd-header>
    <router-view></router-view>
    <h2 v-t='"message"' style="margin-top:10%;text-align:center"> </h2>
  </div>
</template>

<script>
import GdHeader from '_c/GdHeader/index.vue';

export default {
  name: 'app',
  components: {
    GdHeader,
  },
};
</script>

<style>
</style>
