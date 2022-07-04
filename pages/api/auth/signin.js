const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = process.env.ACCESS_KEY;
const schema = require('../../../model/user');




export default async function handler(req, res)
{

    if(req.method !== 'POST')
    {
        res.status(405).send('Method not allowed');
        console.log('Method not allowed');
    }
    else
    {
        try{
            const k = new Promise(async (resolve, reject) => {
                const email = await req.body.email;
                const password = await req.body.password;
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
                }
                );
                schema.findOne({email: email}, (err, user) => {
                    if(err)
                    {
                        console.log("Error finding user" , err);
                        res.json({
                            status: 'error',
                            message: "Something Went Wrong."
                        });
                    }
                    else
                    {
                        if(user)
                        {
                            var hashpass = user.password;
                            if(bcrypt.compareSync(password, hashpass))
                            {
                                const token = jwt.sign({
                                    id: user._id,
                                    email: user.email
                                }, secret);
                                res.json({
                                    status: 'ok',
                                    message: token
                                });
                            }
                            else
                            {
                                res.json({
                                    status: 'error',
                                    message: "Incorrect Email/Mobile -Password Combination"
                                });
                            }
                        }
                        else
                        {
                            res.json({
                                status: 'error',
                                message: "User Not Found."
                            });
                        }
                    }
                });
            });

        }
        catch(err)
        {
            console.log("Error in catch block " , err);
            res.status(500).json(
                {
                    status : 'error',
                    message : "Something Went Wrong on our Side."
                }
            );
        }
    }

}


// export default async function handler(req, res)
// {

//     if(req.method !== 'POST')
//     {
//         res.status(405).send('Method not allowed');
//         console.log('Method not allowed');
//     }
//     else
//     {
//         try{
//             const email = await req.body.email;
//             const password = await req.body.password;
//             mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

//             mongoose.connection.once('open', () => {
//                 console.log('connected to mongo');
//             }).on('error', (error) => {
//                 res.status(500).json(
//                     {
//                         status : 'error',
//                         message : "Something Went Wrong on our Side."
//                     }
//                 );
//             }
//             );
//             schema.findOne({email: email}, (err, user) => {
//                 if(err)
//                 {
//                     console.log("Error finding user" , err);
//                     res.json({
//                         status: 'error',
//                         message: "Something Went Wrong."
//                     });
//                 }
//                 else
//                 {
//                     if(user)
//                     {
//                         var hashpass = user.password;
//                         if(bcrypt.compareSync(password, hashpass))
//                         {
//                             const token = jwt.sign({
//                                 id: user._id,
//                                 email: user.email
//                             }, secret);
//                             res.json({
//                                 status: 'ok',
//                                 message: token
//                             });
//                         }
//                         else
//                         {
//                             res.json({
//                                 status: 'error',
//                                 message: "Incorrect Email/Mobile -Password Combination"
//                             });
//                         }
//                     }
//                     else
//                     {
//                         res.json({
//                             status: 'error',
//                             message: "User Not Found."
//                         });
//                     }
//                 }
//             });

//         }
//         catch(err)
//         {
//             console.log("Error in catch block " , err);
//             res.status(500).json(
//                 {
//                     status : 'error',
//                     message : "Something Went Wrong on our Side."
//                 }
//             );
//         }
//     }

// }