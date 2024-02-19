<template>
  <div id="app">
    <CalendarComponent />
  </div>
</template>

<script>
import CalendarComponent from './components/CalendarComponent.vue'

export default {
  name: 'App',
  components: {
    CalendarComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
