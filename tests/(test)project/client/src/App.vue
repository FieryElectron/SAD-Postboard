<template>
  <div id="app">
        <div id="nav">
            <router-link to="/" tag="button">Home</router-link> |
            <router-link to="/about" tag="button">About</router-link>
        </div>
      <!-- <router-view style="background:#abc; height:500px;"/> -->
      <PostComponent style="background:#ccc" />
  </div>
</template>

<script>
import PostComponent from './components/PostComponent.vue'

export default {
  name: 'App',
  components: {
    PostComponent
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
  margin-top: 60px;
}
</style>
