<template>
	<div>666999
		<v-ons-page>
			<v-ons-toolbar>
				<div class="center" style="font-size:30px">PostBoard</div>

				<div class="right">
						<v-ons-toolbar-button @click="showPopover" ripple  v-bind:item="user" >
							<ons-icon style="color: #0076FF;" size="20px" icon="md-face"  />
							{{user.username}}
						</v-ons-toolbar-button>
				</div>
			</v-ons-toolbar>

			<div style="text-align: center; margin-top: 30px;">
				<p>
					<v-ons-input type="text" v-model="text" placeholder="Create a post" modifier="material" float></v-ons-input>
					<v-ons-button style="margin:10px" v-on:click="tryCreatePost(true)" ripple>Post</v-ons-button>
				</p>
			</div>

			<div>
				<div class="toolbar-button toolbar-button--material">From</div>
				<br>
				<ons-input id="fromdate" type="date"/>
				<ons-input id="fromtime" type="time"/>
				<br>
				<div class="toolbar-button toolbar-button--material">To</div>
				<br>
				<ons-input id="todate" type="date"/>
				<ons-input id="totime" type="time"/>
			</div>

			<v-ons-button style="margin:10px" v-on:click="refreshPost" ripple>Refresh Posts</v-ons-button>

			<div>
				<div class="toolbar-button toolbar-button--material">Page</div>
				<v-ons-select id="page" v-model="selectedPage" @change="pageOnChange">
					<option v-for="(page) in pages"
						v-bind:key="page"
						:value="page"
						>{{page}}</option>
				</v-ons-select>
			</div>



			<div>
				<div class="card card--material"
					v-for="(post, index) in posts"
					v-bind:item="post"
					v-bind:id="post.id"
					v-bind:index="index"
					v-bind:key="post.id">
					<div class="card__title card--material__title" @click="showDescription">{{post.username}}</div>
					<div class="card__content card--material__content">{{post.content}}</div>

					<div>
						<hr>
						<v-ons-button ripple style="float: right;" v-if="post.username == user.username || master" v-on:click="tryDeletePost(post, true)">delete</v-ons-button>
						<br>
						<span style="font-size:12px;">{{ToDate(post.timestamp)}}</span>
					</div>
					
				</div>
			</div>

		</v-ons-page>

		<ons-popover direction="down" id="popover" cancelable>
			<div style="padding: 20px; text-align: center;">
				<div>
					<v-ons-input modifier="material" placeholder="Description" style="width:180px" v-model="user.description" float/>
				</div>

				<p>
					<v-ons-button style="margin:3px" ripple v-on:click="tryUpdateDescription(true)">Update</v-ons-button>
					<v-ons-button style="margin:3px" v-on:click="logOut" ripple>Log out</v-ons-button>
				</p>
			</div>
		</ons-popover>

		<ons-popover direction="up" id="descpopover" cancelable>
			<div class="card" >
				<div class="card__title">Description</div>
				<div class="card__content"  v-bind:item="otheruser">{{otheruser.description}}</div>
			</div>
		</ons-popover>

	</div>

</template>
 

<script>
import router from '../router'
import axios from 'axios';
import moment from 'moment';
import ons from 'onsenui';

export default {
	name: 'App',
	data(){
		return {
			master:false,
			selectedPage: 1,
			pages:[1,2,3,4,5],
			apiMap: {},
			otheruser:{},
			preDesc:"",
			editing:false,
			user: {},
			links: {},
			posts: [],
			error: '',
			text: ''
		}
	},
	components: {

	},
	async mounted() {
		const now = new Date();
		document.getElementById('fromdate').value = this.ToDateOnly(now.getTime());
		document.getElementById('fromtime').value = this.ToTimeOnly(now.getTime());
		document.getElementById('todate').value = this.ToDateOnly(now.getTime());
		document.getElementById('totime').value = this.ToTimeOnly(now.getTime());

		console.log(this.ToDateOnly(now.getTime()));
	},
	async created(){
		console.log("PostBoard created");

		const url = `http://`+process.env.VUE_APP_ROOT_DOMAIN+`:`+process.env.VUE_APP_REST_PORT+`/api/`;

		const res = await axios.get(url);
		//console.log(res.data.apiMap);

		this.apiMap = new Map(res.data.apiMap);

		//console.log(this.apiMap);

		await this.tryLoadProfile(true);
		await this.tryPostPagination(this.selectedPage, true);
		// await this.tryLoadPosts(true);
		
	},methods: {
		async tryPostPagination(page, reTry){
			console.log("tryPostPagination");

			const from = new Date(document.getElementById('fromdate').value+" "+document.getElementById('fromtime').value ).getTime();
			const to = new Date(document.getElementById('todate').value+" "+document.getElementById('totime').value ).getTime();

			const query = new URLSearchParams();
			query.append('from', from);
			query.append('to', to);
			query.append('page', page);

						
			const url = this.apiMap.get('post');
			const res = await axios.get(url, { params: query }, {withCredentials: true});

			if(res.data.flag){
				this.selectedPage = page;
				this.pages = [];
				for(var i=0;i<res.data.pages;++i){
					this.pages.push(i+1);
				}
				return this.posts = res.data.posts;
			}

			if(reTry){
				reTry = false;
				if(await this.refreshAccessToken()){
					console.log("Access Token Refreshed!!!!!!!!!!");
					await this.tryPostPagination(page, reTry);
				}else{
					router.push("LogIn");
				}
			}
		},
		async pageOnChange(){
			await this.tryPostPagination(this.selectedPage, true);
		},
		async refreshPost() {
			await this.tryPostPagination(1, true);
		},
		ToDate(timestamp) {
			return moment(new Date(timestamp)).format('MM/DD/YYYY HH:mm:ss.SSS');
		},
		ToDateOnly(timestamp) {
			return moment(new Date(timestamp)).format('YYYY-MM-DD');
		},
		ToTimeOnly(timestamp) {
			return moment(new Date(timestamp)).format('HH:mm:ss.SSS');
		},
		showDescription(e){
			this.tryGetUserDescription(e.target.innerHTML, true);
			document
			.getElementById('descpopover')
			.show(e);
		},
		showPopover(e) {
			document
			.getElementById('popover')
			.show(e);
		},
		async tryGetUserDescription(username, reTry){
			const url = this.apiMap.get('user')+`${username}`;
			const res = await axios.get(url, {data:{username:username}}, {withCredentials: true});

			if(res.data.flag){
				return this.otheruser = res.data.user;
			}

			if(reTry){
				reTry = false;
				if(await this.refreshAccessToken()){
					console.log("Access Token Refreshed!!!!!!!!!!");
					await this.tryGetUserDescription(username, reTry);
				}else{
					router.push("LogIn");
				}
			}
		},
		async tryUpdateDescription(reTry){
			const url = this.apiMap.get('user');
			const res = await axios.patch(url, {description:this.user.description}, {withCredentials: true});

			if(res.data.flag){
				return ons.notification.toast(res.data.info, { timeout: 1500, animation: 'fall' });
			}

			if(res.data.info){
				return ons.notification.toast(res.data.info, { timeout: 1500, animation: 'fall' });
			}
			
			if(reTry){
				reTry = false;
				if(await this.refreshAccessToken()){
					console.log("Access Token Refreshed!!!!!!!!!!");
					await this.tryUpdateDescription(reTry);
				}else{
					router.push("LogIn");
				}
			}
		},
		async tryDeletePost(post, reTry){
			console.log("tryDeletePost");
			const url = this.apiMap.get('post')+`${post.id}`;
			const res = await axios.delete(url, {withCredentials: true});

			if(res.data.flag){
				ons.notification.toast(res.data.info, { timeout: 1500, animation: 'fall' });
				return await this.tryPostPagination(this.selectedPage, true);
			}

			if(res.data.info){
				return ons.notification.toast(res.data.info, { timeout: 1500, animation: 'fall' });
			}

			if(reTry){
				reTry = false;
				if(await this.refreshAccessToken()){
					console.log("Access Token Refreshed!!!!!!!!!!");
					await this.tryDeletePost(post, reTry);
				}else{
					router.push("LogIn");
				}
			}
		},
		async tryCreatePost(reTry){
			console.log("tryCreatePost");
			const url = this.apiMap.get('post');
			const res = await axios.post(url, {content:this.text}, {withCredentials: true});

			if(res.data.flag){
				this.text = "";
				ons.notification.toast(res.data.info, { timeout: 1500, animation: 'fall' });
				return await this.tryPostPagination(this.selectedPage, true);
			}

			if(res.data.info){
				return ons.notification.toast(res.data.info, { timeout: 1500, animation: 'fall' });
			}

			if(reTry){
				reTry = false;
				if(await this.refreshAccessToken()){
					console.log("Access Token Refreshed!!!!!!!!!!");
					await this.tryCreatePost(true);
				}else{
					router.push("LogIn");
				}
			}
		},
		async tryLoadProfile(reTry){
			console.log("tryLoadProfile");
			const url = this.apiMap.get('loadprofile');
			const res = await axios.get(url, {withCredentials: true});
			
			if(res.data.flag){
				if(res.data.master){
					this.master = true;
				}
				return this.user = res.data.user;
			}

			if(reTry){
				reTry = false;
				if(await this.refreshAccessToken()){
					console.log("Access Token Refreshed!!!!!!!!!!");
					await this.tryLoadProfile(reTry);
				}else{
					router.push("LogIn");
				}
			}
		},
		async refreshAccessToken(){
			const url = this.apiMap.get('token');
			const res = await axios.get(url, {withCredentials: true});
			return res.data.flag;
		},
		async logOut(){
			const url = this.apiMap.get('logout');
			await axios.delete(url, {withCredentials: true});
			router.push("LogIn");
		}
	},
}
 </script>