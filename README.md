# SAD-Postboard

## SAD-Postboard features.

### REST API

* Richardson Maturity Model - Level 2 (Hypermedia Control)
* API is safe and idempotent
* API supports query filters
* API supports pagination

### DB Access

* Data Mapper Pattern implemented
* Query Object Pattern implemented

### Authentification

* Backend: Manual implementation of user authentification
* Web Token based authentification
* User can login from frontend
* User can login via  OAuth2 (Google) from frontend
* User registration working from frontend
* Users have different roles based on login
* User can edit profile settings from frontend

### Frontend

* MVC, MVVM or related Pattern used
* Frontend Routing or Application Controller Logic implemented
* Reactive Web App (with no serverside rendering)
* App uses mobile CSS framework onsen
* Frontend app bundled using Electron

### DevOps

* Working dockerfile for backend located in repository
* Multi-Container environment created (using docker-compose)
* Backend: Unit-tests availabe
* Frontend: Unit-tests available


<img src="Animation.gif" width="400" height="200" />