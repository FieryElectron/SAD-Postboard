<template>
  <div>
    <!-- <h1>Login page</h1>
	<hr>
	<input type="text" name="username" v-model="input.username" placeholder="Username" />
	<hr>
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
	<hr>
	<button type="button" v-on:click="register">Register</button>
    <button type="button" v-on:click="login">Login</button>	 -->

	<v-ons-page>
		<v-ons-toolbar>
			<div class="center" style="font-size:30px">LogIn</div>
		</v-ons-toolbar>

		<div style="text-align: center; margin-top: 30px;">
			<p>
				<v-ons-input v-model="input.username"  modifier="material" placeholder="Username" float />
			</p>
			<p>
				<v-ons-input v-model="input.password" modifier="material" type="password" placeholder="Password" float/>
			</p>
			<p>
				<ons-button style="margin:10px" @click="register">Register</ons-button>
				<ons-button style="margin:10px" @click="login">Log in</ons-button>
				<br>
				<ons-button style="margin:10px" @click="loginGoogle">Google</ons-button>
			</p>
		</div>
	</v-ons-page>
  </div>
</template>


 

<script>
import router from '../router'
import axios from 'axios';
import ons from 'onsenui';

export default {
    data(){
        return {
			input: {
				username: "",
				password: ""
			},
			apiMap: {}
        }
    },
    async created(){
		const url = `http://`+process.env.VUE_APP_ROOT_DOMAIN+`:`+process.env.VUE_APP_AUTH_PORT+`/api/`;

		const res = await axios.get(url);
		this.apiMap = new Map(res.data.apiMap);

		//console.log(res.data.apiMap);
		console.log("Login created");
	},methods: {
		async loginGoogle(){
			const googleUser = await this.$gAuth.signIn();
		
			const username = googleUser.Tt.Bd;


			const url = this.apiMap.get('logingoogle');

			const res = await axios.post(url, {username:username}, {withCredentials: true});
			
			if(res.data.flag){
				ons.notification.toast(res.data.info, { timeout: 1500, animation: 'fall' });
				router.push("PostBoard");
			}else{
				ons.notification.toast(res.data.info, { timeout: 1500, animation: 'fall' });
			}
		},
		async register(){
		
			const url = this.apiMap.get('register')+`?username=${this.input.username}&password=${this.input.password}`;

			const res = await axios.post(url);

			ons.notification.toast(res.data.info, { timeout: 1500, animation: 'fall' });
		},
		async login(){
			const url = this.apiMap.get('login')+`?username=${this.input.username}&password=${this.input.password}`;

			const res = await axios.post(url, {}, {withCredentials: true});
			
			if(res.data.flag){
				ons.notification.toast(res.data.info, { timeout: 1500, animation: 'fall' });
				router.push("PostBoard");
			}else{
				ons.notification.toast(res.data.info, { timeout: 1500, animation: 'fall' });
			}
			
		}
	}


}
 </script>