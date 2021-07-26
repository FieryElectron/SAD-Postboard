import axios from 'axios';
 
const url = 'http://localhost:5000/api/posts/';

class PostService{

    static async getPosts(){
        const res = await axios.get(url);
        const data = res.data;

        return data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt),
        }));
    }
    // static getPosts(){
    //     return new Promise((resolve, reject) => {
    //         try{
    //             const res = axios.get(url);
                
    //             const data = res.data;
    //             console.log(res);
    //             console.log(res.data);
    //             resolve(
    //                 post => ({
    //                     ...post, data
    //                 })
    //             );
    //         }catch(err){
    //             reject(err);
    //         }
    //     });
    // }


    static insertPost(text){
        return axios.post(url, {
            text
        });
    }

    static deletePost(id){
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;
