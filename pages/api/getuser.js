const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const secret = process.env.ACCESS_KEY;
const schema = require('../../model/user');


export default async function Handler(req , res){
    // only post
    if(req.method !== 'POST'){
        res.sendStatus(405).send('Method not allowed');
    }
    else{
        try{
            const token = req.headers.authorization;

            // check if monogoose is connected, if not connect
            if(!mongoose.connection.readyState)
            {
                mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
            }

            // check if token is valid
            jwt.verify(token, secret, (err, decoded) => {
                if(err)
                {
                    console.log(err);
                    res.status(401).json({
                        status: 'tokenerr',
                        message: 'Invalid Token'
                    });
                }
                else{
                    var email = decoded.email;
                    // find user by email
                    schema.findOne({email: email}, (err, user) => {
                        if(err)
                        {
                            res.json(
                                {
                                    status: 'error',
                                    message: 'Something went wrong'
                                }
                            )
                        }
                        else
                        {
                            if(user)
                            {
                                res.json(
                                    {
                                        status: 'ok',
                                        email: user.email,
                                        name: user.name,
                                    }
                                )
                            }
                            else
                            {
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
        catch(e){
            console.log(e);
            res.status(500).json({
                status: 'error',
                message: 'Something Went Wrong'
            });
        }
    }
}