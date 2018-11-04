<template>
  <div>
    <Header></Header>
    <Sider></Sider>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Sider from '@/components/Sider'
  export default {
    name: 'Main',
    data() {
      return {

      }
    },
    components: {Header, Sider},
    methods: {
      
    }
  }
</script>
<style>
  
</style>
