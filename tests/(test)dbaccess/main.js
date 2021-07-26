const UserService = require('./models/UserService');
const PostService = require('./models/PostService');
const User = require('./Classes/User');
const Post = require('./Classes/Post');


// let res = UserService.CreateUser(new User("mov", "sad","Hello!"));

// if(res.flag){
//     console.log("user created");
// }else{
//     console.log(res.info);
// }


// res = UserService.UpdateUser(new User("mov", "111","Hello!"));

// if(res.flag){
//     console.log("user updated");
// }else{
//     console.log("user not exists");
// }

// res = UserService.GetUser(new User("mov"));

// if(res.flag){
//     console.log(res.user);
// }else{
//     console.log("cant find user");
// }


// res = UserService.DeleteUser(new User("msov"));

// if(res.flag){
//     console.log("user deleted");
// }else{
//     console.log("user deleted failed");
// }

// UserService.DeleteAllUsers();

// console.log(UserService.GetAllUsers());

// console.log(UserService.GetAllTables());

//-----------------------------

// let res = PostService.CreatePost(new Post(0, "1sad", "1sda1", 10));

// if(res.flag){
//     console.log("post created");
// }else{
//     console.log("post created failed");
// }


// res = PostService.UpdatePost(new Post(1, "new", "new", 100));

// if(res.flag){
//     console.log("post updated");
// }else{
//     console.log("post updated failed");
// }

// res = PostService.GetPost(new Post(1));

// if(res.flag){
//     console.log(res.post);
// }else{
//     console.log("cant find post");
// }

// res = PostService.DeletePost(new Post(2));

// if(res.flag){
//     console.log("post deleted");
// }else{
//     console.log("post deleted failed");
// }


// res = PostService.GetByCondition("timestamp","<","11");
// console.log(res);

// PostService.DeleteAllPosts();

// console.log(PostService.GetAllTables());

// res = PostService.GetAllPosts();
// console.log(res);
