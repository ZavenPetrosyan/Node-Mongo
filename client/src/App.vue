<template>
  <div id="app">
    <ClientComponent />
  </div>
</template>

<script>
import ClientComponent from './components/ClientComponent.vue'

export default {
  name: 'app',
  components: {
    ClientComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
