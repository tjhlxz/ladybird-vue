<template>
  <div id="app">
    <Login></Login>
  </div>
</template>

<script>
import Login from '@/pages/Login';

export default {
  name: 'App',
  data() {
    return {user: this.USER.user}
  },
  components: {Login},
  methods: {
    
  }
};
</script>

<style>
  
</style>
