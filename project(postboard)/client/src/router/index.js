import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../views/Login.vue'
import PostBoard from '../views/PostBoard.vue'
import axios from 'axios';

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		beforeEnter: async (to, from, next) => {
			let url = `http://`+process.env.VUE_APP_ROOT_DOMAIN+`:`+process.env.VUE_APP_AUTH_PORT+`/api/`;

			let res = await axios.get(url);

			const apiMap = new Map(res.data.apiMap);

			url = apiMap.get('islogin');
			res = await axios.get(url, {withCredentials: true});
			
			if(res.data == false){
				next('/login');
			}else{
				if(!from.name){
					next('/postboard');
				}
			}
		}
	},
	{
		path: '/login',
		name: 'LogIn',
		component: LogIn,
		beforeEnter: async (to, from, next) => {
			let url = `http://`+process.env.VUE_APP_ROOT_DOMAIN+`:`+process.env.VUE_APP_AUTH_PORT+`/api/`;

			let res = await axios.get(url);

			const apiMap = new Map(res.data.apiMap);

			url = apiMap.get('islogin');
			res = await axios.get(url, {withCredentials: true});
			
			if(res.data == false){
				next();
			}else{
				if(!from.name){
					next('/postboard');
				}
			}
		}
	},
	{
		path: '/postboard',
		name: 'PostBoard',
		component: PostBoard,
		beforeEnter : async (to, from, next) => {
			let url = `http://`+process.env.VUE_APP_ROOT_DOMAIN+`:`+process.env.VUE_APP_AUTH_PORT+`/api/`;
			let res = await axios.get(url);

			const apiMap = new Map(res.data.apiMap);

			url = apiMap.get('islogin');
			res = await axios.get(url, {withCredentials: true});
			
			if(res.data == true){
				next();
			}else{
				if(!from.name){
					next('/login');
				}
			}
		}
	}
]

const router = new VueRouter({
	//mode: 'history',
    routes
})

export default router
