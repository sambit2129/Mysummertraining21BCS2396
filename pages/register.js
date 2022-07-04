import style from '../styles/register.module.css';

import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

export default function Register() {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/dashboard";
        }
    })
    return(
    <>
        <Head>
            <title>Sign Up | LinkedIn</title>
            <meta name="description" content="A LinkedIn clone by Surya Teja Reddy" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col justify-center text-center self-center">
            <img
                src='/logo-with-text.svg'
                className="self-center m-auto my-6 h-[36px]"
            />
            <h1 className="font-semibold text-[18px] leading-snug tracking-wide">Join LinkedIn now - its free</h1>

            <div className="flex flex-col m-auto w-[350px] mt-6 text-gray-500">
                <label className="text-left text-sm">Email or phone number</label>
                <input id='email' type={'text'} className="w-full outline-none border-gray-500 border-[1px] rounded-[4px]" />
            </div>
            <div className="flex flex-col m-auto w-[350px] mt-4 text-gray-500">
                <label className="text-left text-sm">Your Name</label>
                <input id='name' type={'text'} className="w-full outline-none border-gray-500 border-[1px] rounded-[4px]" />
            </div>
            <div className="flex flex-col m-auto w-[350px] mt-4 text-gray-500">
                <label className="text-left text-sm">Password (6 or more Characters)</label>
                <input id='password' type={'password'} className="w-full outline-none border-gray-500 border-[1px] rounded-[4px]" />
            </div>
            <p className="text-red-600 text-semibold text-sm" id="err"></p>
            <div id="cont" className="flex justify-center cursor-pointer w-[350px] mt-5 m-auto bg-[#0966C2] py-2 rounded-full text-white font-semibold transition-all duration-500 ease-in-out"  onClick={
                () => {reg();}
            }  >
                Continue
            </div>  
        
        </div>

        <p className="m-auto text-center mt-40">Already on LinkedIn? <Link href={'/login'}><a className="text-[#0966c2] hover:underline">Sign In</a></Link></p>
    </>
    );
}


async function reg()
{
    // set sign up button's inner text as a loading spinner
    document.getElementById("err").innerText = "";
    document.getElementById("cont").innerText = "";

    document.getElementById("cont").style.width = '200px';


    var div = document.createElement("div");
    div.className = "w-[20px] h-[20px] self-center m-auto"
    div.classList.add(style.loader);

    document.getElementById("cont").appendChild(div);

    var url ='/api/auth/register';
    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    var data = {
        email: email,
        name: name,
        password: password
    };
    const fetc = async () => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    var k = await fetc();
    k = JSON.parse(await k.text());
    if (k.status === 'ok') {
        document.getElementById("cont").innerText = "Suscessfully Registered";
        document.getElementById("cont").style.width = '350px';
        document.getElementById("err").innerText = "Redirecting to Feed.";
        document.getElementById("err").style.color = "green";
        localStorage.setItem("token", k.message);
        setTimeout(() => {
            window.location.href = "/dashboard";
        },1000);
    }
    else{
        setTimeout(() => {
            document.getElementById("err").innerText = k.message;
            document.getElementById("cont").innerText = "Try Again";
            document.getElementById("cont").style.width = '350px';
        }, 2000);
    }
}