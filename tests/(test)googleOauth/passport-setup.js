const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
	console.log("serializeUser");
	//console.log(user);
	done(null, user);
});
  
passport.deserializeUser(function(user, done) {
	console.log("deserializeUser");
	//console.log(user);
	done(null, user);
});

passport.use(new GoogleStrategy({
	clientID: "814988127498-eq6qcj44llof26n4i4t9nn1v58mn97la.apps.googleusercontent.com",
	clientSecret: "GZJ3aL3WzU8GHCmRdkVb2kWk",
	callbackURL: "http://localhost:8080/api/google/callback/"
	},(accessToken, refreshToken, profile, done) => {
		console.log("GoogleStrategy");
		// console.log(accessToken);
		// console.log(refreshToken);
		// console.log(profile);

		return done(null, profile);
	}
));
