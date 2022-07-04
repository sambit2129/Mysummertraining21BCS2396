const mongoose = require('mongoose');
const schema = require('../../../model/post');

export default async function Handler(req , res)
{
    try
    {
        if(!mongoose.connection.readyState)
        {
            mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
        }
        var posts = await schema.find({});

        var postsResult = posts.map(post => {
            var result = {
                id : post._id,
                name: post.name,
                email: post.email,
                message: post.message,
                likes: post.likes,
                image: post.image,
            }
            return result;
        });

        res.send(postsResult);
    }
    catch(err)
    {
        console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'Something Went Wrong'
            });
    }
}

