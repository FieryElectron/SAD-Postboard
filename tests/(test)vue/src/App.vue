<template>
  <div id="app">
    <Header />
    <router-view/>
	<input type="text" v-bind:disabled="!editing" value="666">
	<button v-if="!editing" v-on:click="Edit">Edit</button>

	<button v-if="editing" v-on:click="Update">Update</button>
	<button v-if="editing" v-on:click="Cancel">Cancel</button>
	
	<div
				v-bind:item="post"
				v-bind:id="post.id"
				v-bind:key="post.id">

				<!-- <button v-if="post.username == this.user.username">Delete</button> -->
	
				{{post.timestamp}}==
				{{ToDate(1591489948)}}

				{{post.username}}
				<br>
				{{post.content}}
				<hr>
			</div>
  </div>
</template>

<script>
import Header from "./components/layout/Header"
import moment from 'moment';

export default {
	name:"app",
	components:{
		Header
	},
	data(){
		return {
			post:{timestamp:1591489760},
			editing:false
		}
	},
	created(){
		console.log(process.env.VUE_APP_ROOT_DOMAIN);
	},
	methods: {
		Edit(){
			this.editing = true;
		},
		Update(){
			this.editing = false;
		},
		Cancel(){
			this.editing = false;
		},
		ToDate(timestamp) {
			return moment(new Date(timestamp * 1000)).format('DD/MM/YYYY, HH:mm:ss');
			// console.log();
			// return moment();
		}
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
