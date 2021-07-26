<template id="main-page">
<div>
	<v-ons-page>
		<!-- <v-ons-toolbar>
			<div class="center" style="font-size:30px">LogIn</div>
		</v-ons-toolbar> -->

		<div style="text-align: center; margin-top: 30px;">
			<p>
				<ons-input id="username" modifier="material" placeholder="Username" float></ons-input>
			</p>
			<p>
				<ons-input id="password" modifier="material" type="password" placeholder="Password" float></ons-input>
			</p>
			<p>
				<ons-button style="margin:10px" @click="login">Register</ons-button>
				<ons-button style="margin:10px" @click="login">Log in</ons-button>
			</p>
		</div>

		<v-ons-toolbar>
			<div class="center" style="font-size:30px">PostBoard</div>

			<div class="right">
					<ons-toolbar-button @click="showPopover" ripple>
						<ons-icon style="color: #0076FF;" size="20px" icon="md-face"  />
						JMP
					</ons-toolbar-button>
			</div>
		</v-ons-toolbar>

		<!-- <ons-button ripple>
			<ons-icon icon="fa-cog"/>
		</ons-button>

		<ons-fab style="color: #0076FF;" ripple modifier="mini">
			<ons-icon  icon="md-plus"/>
		</ons-fab>



		<ons-icon style="color: #0076FF;" size="50px" icon="md-home"></ons-icon>
		<ons-icon style="color: #0076FF;" size="50px" icon="md-zoom-in"></ons-icon>
		<ons-icon style="color: #0076FF;" size="50px" icon="fa-file"></ons-icon>
		<ons-icon style="color: #0076FF;" size="50px" icon="fa-cog"></ons-icon>
		<ons-icon style="color: #0076FF;" size="50px" icon="fa-car"></ons-icon>
		<ons-icon style="color: #0076FF;" size="50px" icon="md-face"></ons-icon>
		<ons-icon style="color: #0076FF;" size="50px" spin icon="md-spinner"></ons-icon> -->




		<div style="text-align: center; margin-top: 30px;">
			<p>
				<ons-input modifier="material" placeholder="Post" float></ons-input>
				<ons-button style="margin:10px"  @click="login" ripple>Send</ons-button>
			</p>
			
		</div>

	
		<div class="card card--material">
			<div class="card__title card--material__title" @click="mouseover">JMP</div>
			<div class="card__content card--material__content">Helloworld.Helloworld.Helloworld.Helloworld.Helloworld.</div>
			<div style="text-align: right;">
				<ons-button  @click="login" ripple>delete</ons-button>
			</div>
		</div>

		<div class="card card--material">
			<div class="card__title card--material__title">MOV</div>
			<div class="card__content card--material__content">Helloworld.Helloworld.Helloworld.Helloworld.Helloworld.</div>
			<div style="text-align: right;">
				<ons-button  @click="login" ripple>delete</ons-button>
			</div>
		</div>



		

	</v-ons-page>

	<ons-popover direction="down" id="popover" cancelable>
		<div style="padding: 20px; text-align: center;">
			<div>
				<ons-input modifier="material" placeholder="Description" style="width:180px" value="Hello World" float/>
			</div>

			<p>
				<ons-button style="margin:3px" @click="login" ripple>Update</ons-button>
			</p>
		</div>
	</ons-popover>

	<ons-popover direction="up" id="descpopover" cancelable>
		<div class="card">
			<div class="card__title">Description</div>
			<div class="card__content">Helloworld.</div>
		</div>
	</ons-popover>

	</div>

</template>

<style>

</style>

<script>
import ons from 'onsenui';


export default {
	name: 'App',
	data(){
		return{
			user:{username:"jmp", description:"Hello"}
		}
	},
	methods:{
		mouseover(target){
			console.log("mouseover");
			document
			.getElementById('descpopover')
			.show(target);
		},

		showPopover(target) {
			document
			.getElementById('popover')
			.show(target);
		},

		login() {
			var username = document.getElementById('username').value;
			var password = document.getElementById('password').value;
			if (username === 'bob' && password === 'secret') {
				ons.notification.alert('Congratulations!');
			} else {
				ons.notification.alert('Incorrect username or password.');
			}
		}
	}
}

</script>