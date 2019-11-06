<template>
  <div class="home">
     首页
  </div>
</template>

<script>
import { getData } from '@/api/home';

export default {
  name: 'home',
  mounted() {
    getData().then(() => {
    });
    console.log(this.$store.state.login.token);
  },
  components: {
  },
};
</script>
