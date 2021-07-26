<template>
  <div>
    <h1>User page</h1>
    <router-link to="/" tag="button">Home</router-link>
  </div>
</template>
 

<script>
import router from '../router'

 export default {
   async created(){
     console.log("User created");

     setTimeout(() => {
       router.push({ name: "Home"});
     }, 2000);
     
  }
 }
 </script>