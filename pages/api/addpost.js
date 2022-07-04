const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const secret = process.env.ACCESS_KEY;

const schema  = require('../../model/post');
const schemaU  = require('../../model/user');

export default async function Handler(req , res)
{
    if(req.method !== 'POST')
    {
        res.sendStatus(405).send('Method not allowed');
    }
    else{
        try{
            const token = req.headers.authorization;

            if(!mongoose.connection.readyState)
            {
                mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
            }

            jwt.verify(token, secret, (err, decoded) => {
                if(err)
                {
                    console.log(err);
                    res.status(401).json({
                        status: 'tokenerr',
                        message: 'Invalid Token'
                    });
                }
                else
                {
                    var email = decoded.email;
                    schemaU.findOne({email: email}, (err, user) => {
                        if(err)
                        {
                            res.json(
                                {
                                    status: 'error',
                                    message: 'Something went wrong'
                                }
                            )
                        }
                        else{
                            if(user)
                            {
                                var name = user.name;
                                var message = req.body.message;
                                var image = req.body.image;
                                if(image)
                                {
                                    var newPost = new schema({
                                        name: name,
                                        email: email,
                                        message: message,
                                        image: image,
                                        likes: 0
                                    });

                                    newPost.save((err, post) => {
                                        if(err)
                                        {
                                            res.json(
                                                {
                                                    status: 'error',
                                                    message: 'Something went wrong'
                                                }
                                            )
                                        }
                                        else{
                                            res.json(
                                                {
                                                    status: 'ok',
                                                    message: 'Post added'
                                                }
                                            )
                                        }
                                    });
                                }
                                else{
                                    var newPost = new schema({
                                        name: name,
                                        email: email,
                                        message: message,
                                        likes: 0
                                    });

                                    newPost.save((err, post) => {
                                        if(err)
                                        {
                                            res.json(
                                                {
                                                    status: 'error',
                                                    message: 'Something went wrong'
                                                }
                                            )
                                        }
                                        else{
                                            res.json(
                                                {
                                                    status: 'success',
                                                    message: 'Post added'
                                                }
                                            )
                                        }
                                    });
                                }
                            }
                            else{
                                res.json(
                                    {
                                        status: 'error',
                                        message: 'User not found'
                                    }
                                )
                            }
                        }
                    });
                }
            });
        }
        catch(e)
        {
            console.log(e);
            res.status(500).json({
                status: 'error',
                message: 'Something Went Wrong'
            });
        }
    }
}