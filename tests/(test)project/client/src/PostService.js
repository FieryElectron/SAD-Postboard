import axios from 'axios';

let url = "";

class PostService{

    static async getLinks(){
        const res = await axios.get('http://localhost:5000/api/links');
        const data = res.data;

        url = data[0];


        

        return data;
    }

    static async getPosts(){
        const res = await axios.get(url);
        const data = res.data;

        return data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt),
        }));
        // return new Promise( async (resolve, reject) => {
        //     try{
        //         const res = await axios.get(url);
        //         const data = res.data;
        //         resolve(
        //             data.map(post => ({
        //                 ...post,
        //                 createdAt: new Date(post.createdAt)
        //             }))
        //         );
        //     }catch(err){
        //         reject(err);
        //     }
        // });
    }



    static insertPost(text){
        return axios.post(url,{
            text
        });
    }

    static updatePost(post){
        console.log(post);

        return axios.put(url,{
            id:post.id,
            text:post.text
        });
    }

    static deletePost(id){
        return axios.delete(`${url}${id}`);
    }

}

export default PostService;
