<template>
  <div>
    <h1>Log-in page</h1>
    <router-link to="/about" tag="button">About</router-link>
  </div>
</template>
 

 <script>
 export default {
   async created(){
     console.log("Log-in created");
  }
 }
 </script>