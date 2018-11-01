<template>
  <div>
  <div id="app">
    <Header></Header>
    <Sider></Sider>
    <router-view></router-view>
  </div>
  <div id="app" v-if="user">
    <Login></Login>
  </div>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Sider from '@/components/Sider';
import Login from '@/components/Login';

export default {
  name: 'App',
  data() {
    return {user: this.USER.user}
  },
  components: {Header, Sider,Login},
  methods: {
    
  }
};
</script>

<style>
  
</style>
