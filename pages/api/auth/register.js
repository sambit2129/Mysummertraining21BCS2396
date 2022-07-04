const mongoose = require('mongoose');

const schema = require('../../../model/user');
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret = process.env.ACCESS_KEY;

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.status(405).send('Method not allowed');
    }
    else{
        try{
            const textPassword = await req.body.password;
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(textPassword, salt);

            const user = new schema({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });

            mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

            mongoose.connection.once('open', () => {
                console.log('connected to mongo');
            }).on('error', (error) => {
                res.status(500).json(
                    {
                        status : 'error',
                        message : "Something Went Wrong on our Side."
                    }
                );
            });
            user.save((err, data) => {
                if(err)
                {
                    res.json({
                        status: 'error',
                        message: "A user With this email already exists,Try Logging in"
                    });
                }
                else{
                    const token = jwt.sign
                        ({
                            id: data._id,
                            email : data.email
                        },
                        secret
                    );
                    res.json({
                        status: 'ok',
                        message :token
                    });
                }
            })
        }
        catch(err){
            res.status(500).json(
                {
                    status : 'error',
                    message : "Something Went Wrong on our Side."
                }
            );
        }
    }
}
  