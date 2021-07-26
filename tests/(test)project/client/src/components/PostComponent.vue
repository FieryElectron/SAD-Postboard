<template>
  <div class="container">
    <h1>Latested Posts</h1>
    <button v-on:click="test">Test</button>
    <button v-on:click="Redirect">Redirect</button>

    <div class="create-post">
      <label for="create-post">Say Something...</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create a post" />
      <button v-on:click="createPost">Post</button>
    </div>
    <hr>

    <p class="err" v-if="error">{{ error }}</p>

    <div class="posts-container">
      <div class="post"
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post.id"
      v-on:dblclick="deletePost(post.id)">

      {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}
      
      <p class="text">{{post.text}}</p>
      <input type="value" v-bind:value="post.text" 
      v-on:change="postOnchange(post,$event)" />

      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService'
import axios from 'axios';

export default {
  name: 'PostComponent',
  data(){
    return {
      links: {},
      posts: [],
      error: '',
      text: ''
    }
  },
  async created(){
    console.log(await PostService.getLinks());

    try{
      this.posts = await PostService.getPosts();
    }catch(err){
      this.error = err.message;
    }
  },
  methods: {
    async createPost(){
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id){
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    async postOnchange(post,e){
      post.text = e.target.value;
      console.log(post.id);

      console.log(post.text);
      await PostService.updatePost(post);
      this.posts = await PostService.getPosts();
    },
    async test(){
        const res = await axios.get("http://localhost:5000/api/courses?page=1&limit=5");
        const data = res.data;
        console.log(data);
    },
    async Redirect(){
      axios.get("http://localhost:5000/api/redirect");
        // const res = await axios.get("http://localhost:5000/api/redirect");
        // const data = res.data;
        // console.log(data);
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container{
  max-width: 800px;
  margin: 0 auto;
  padding: 10px;
}

p.error{
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post{
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color:white;
  font-size: 13px;
}

p.text{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
