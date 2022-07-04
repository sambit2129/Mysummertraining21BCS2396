import Link from "next/link";
import style from '../styles/register.module.css';

export default function SignIn() {
    return(
        <div>
            <img src="/logo-with-text.svg" alt="LinkedIn-Logo-Main" className="h-[42px] my-8 mx-16" />

            <div className="w-[400px] rounded-[5px] shadow-xl m-auto">
                <div className="mx-6 pb-24 pt-7">
                    <h1 className="text-[36px] font-medium">Sign In</h1>
                    <p className="font-normal">Stay updated on your professional world</p>
                    <div>
                        <input  type='text' id='email' className="w-full my-4 py-2 px-2 rounded-md outline-none border-[1px] border-black"   placeholder="Email or Phone"/>
                        <input  type='password' id='passw' className="w-full mb-4 py-2 px-2 rounded-md outline-none border-[1px] border-black"   placeholder="Password"/>
                        <Link href={'/register'}>
                            <a className="font-semibold text-blue-800 hover:underline">
                                Forgot Password?
                            </a>
                        </Link>
                    </div>
                    <p id="err" className="text-red-700"></p>
                    <div id="button" onClick={
                        () => {
                            onSignIn();
                        }
                    } className="cursor-pointer self-center m-auto hover:bg-[#538fdf] w-full transition-all duration-500 ease-in-out py-3 text-white font-semibold bg-[#2267c3] my-4 text-center rounded-full">
                        Sign in
                    </div>
                </div>
            </div>

            <p className="m-auto text-center mt-6">New to LinkedIn? 
                <Link href={'/register'}>
                    <a className="font-semibold text-blue-800 hover:underline">Join Now</a>
                </Link>
            </p>

        </div>
    );
}


function onSignIn()
{
    var email = document.getElementById('email').value;
    var password = document.getElementById('passw').value;
    var data = {
        email: email,
        password: password
    }
    if(email == "" || password == "")
    {
        document.getElementById('err').innerText = "Please fill all the fields";
        return;
    }
    else{
        const uri = '/api/auth/signin';
        document.getElementById('button').innerText = "";
        var div = document.createElement("div");
        div.className = "w-[20px] h-[20px] self-center m-auto"
        div.classList.add(style.loader);
        document.getElementById("button").appendChild(div);
        document.getElementById('button').disabled = true;
        document.getElementById('button').style.width = "150px";
        document.getElementById('button').style.cursor = "not-allowed";
        fetch(uri, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                if(data.status === 'ok')
                {
                    document.getElementById('err').innerText = "Successfully Signed In";
                    document.getElementById('err').style.color = "green";
                    localStorage.setItem('token', data.message);
                    setTimeout(function(){
                        window.location.href = "/dashboard";
                    }, 1000);
                    
                }
                else
                {
                    console.log(err);
                    document.getElementById('err').innerText = data.message;
                    document.getElementById('button').innerText = "Sign in";
                    document.getElementById('button').style.width = "100%";
                    document.getElementById('button').style.cursor = "pointer";
                    document.getElementById('button').disabled = false;
                }
            })
            .catch(err => {
                console.log(err);
                document.getElementById('err').innerText = "We are facing some technical issues. Please try again later.";
                document.getElementById('button').innerText = "Sign in";
                document.getElementById('button').style.width = "100%";
                document.getElementById('button').style.cursor = "not-allowed";
                document.getElementById('button').style.backgroundColor = "#f77672";
            }
        );
    }
}

