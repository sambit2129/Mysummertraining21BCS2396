import Link from "next/link";
import {useState, useEffect, createElement } from "react";
import style from '../styles/dash.module.css';

import Head from 'next/head';

export default function Dashboard({data}) {
    const [dark , setDark] = useState(false);
    const [email , setEmail] = useState('');
    const [loggedIn , setLoggedIn] = useState(true);

    useEffect(() => {
        const localDark = localStorage.getItem('dark');
        if(localDark){
            document.getElementById('check').checked = true;
            setDark(true);
        }
    });

    useEffect(() => {
        if(dark)
        {
            localStorage.setItem('theme', 'true');
        }
        else{
            if(('theme' in localStorage))
            {
                localStorage.removeItem('theme');
            }
        }
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [dark]);


    useEffect(() => {
        var token = localStorage.getItem("token");
        // send a post request to getuser and get email,
        // set token as authorization header
        fetch('/api/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 'tokenerr')
            {
                setLoggedIn(false);
                document.getElementById('name').innerHTML = "Sample User";
                document.getElementById('name-1').innerHTML = "Sample User";
                document.getElementById('email').innerHTML = "me@suryateja222.me";
                setEmail("me@suryateja222.me");
            }
            else if(data.status === 'error')
            {
                // reload
                window.location.href = "/";
            }
            else{
                var name = data.name;
                var gemail = data.email;
                document.getElementById('name').innerHTML = name;
                document.getElementById('name-1').innerHTML = name;
                document.getElementById('email').innerHTML = gemail;
                setEmail(gemail);
            }
        })
    } , [])


    return (
        <div id="main" className="bg-[#f3f2ef] dark:bg-[#000000] w-full h-full">

            <Head>
                <title>Dashboard | LinkedIn</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <html lang={'en'} />
            </Head>

            {/* error div */}
            <div id="error_div_main" className="overflow-x-hidden hidden translate-x-[300px]  flex-col justify-center  right-0 absolute bg-red-400 dark:bg-gray-600 w-[300px] h-[75px] z-[99999]  mt-8 ">
                <div  id="error_div_main_c" className="self-center align-middle text-lg font-semibold text-white ">
                    Error
                </div>
            </div>

            <div id="new-post-bg" className="w-full h-full absolute z-40 opacity-50 dark:bg-black bg-white text-center hidden justify-center self-center" >
                
            </div>
            <div id="new-post" className="hidden absolute z-50 opacity-100 w-full h-full" >
                <div className="flex flex-col justify-center m-auto align-middle self-center w-full h-full">
                    <div className="md:h-[300px] md:w-[600px] mdm:min-h-[100px] mdm:w-[90%] rounded-xl dark:bg-[#1e2226] bg-white self-center p-4 mdm:mx-4" >
                        <div className="flex justify-between">
                            <h1 className="text-lg font-semibold text-black dark:text-white">Create a Post</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" viewBox="0 0 24 24"  width="24" height="24" focusable="false" onClick={
                                () => {
                                    toogle();
                                }
                            }>
                                <path className="fill-black dark:fill-white" d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
                            </svg>
                        </div>
                        <div className="flex mt-4">
                            <img src="/profile.svg" className="w-[32px] h-[32px] " alt="Profile-img" />
                            <span id='name' className="mx-4 font-semibold capitalize text-black dark:text-white flex justify-center text-lg hover:underline cursor-pointer">Loading...</span>
                        </div>
                        <div>
                            <textarea rows={5} id="inp-text" className="w-full outline-none bg-white dark:bg-[#1e2226] text-black dark:text-white mt-2" placeholder="What do you want to Talk About ?" /> 
                        </div>
                        <p id="p-err" className="text-red"></p>
                        <div className="flex justify-between">
                            <input type={'text'} id="img-url" className="w-3/4 outline-none bg-white dark:bg-[#1e2226] text-black dark:text-white mt-2 " placeholder="Add a photo URL(optional)"  />
                            <a onClick={
                                () => {
                                    newPost();
                                }
                            } className="cursor-pointer text-lg font-semibold text-black dark:text-gray-700 dark:bg-gray-200 px-2 py-1 rounded-full mx-4">Post</a>
                        </div>
                    </div>
                </div>
            </div>

            <header className="bg-[#ffffff] dark:bg-[#1e2226]">
                <div className="flex md:mx-20 mdm:mx-4 py-2 justify-between">
                    <div className="flex">
                        <img src='/linkedin-icon.svg' alt='Feed Logo'  />
                        <div className="h-3/4 dark:bg-[#384151] bg-[#eff3f8] self-center align-middle rounded-md">
                            <div className="py-2 px-3 flex mdm:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="self-center mr-2" viewBox="0 0 16 16"  fill="currentColor" width="16" height="16" focusable="false">
                                    <path className="dark:fill-white fill-[#7a7d7f]" d="M14.56 12.44L11.3 9.18a5.51 5.51 0 10-2.12 2.12l3.26 3.26a1.5 1.5 0 102.12-2.12zM3 6.5A3.5 3.5 0 116.5 10 3.5 3.5 0 013 6.5z"></path>
                                </svg>
                                <input type={'text'} className="outline-none dark:bg-[#384151] mdm:hidden bg-[#eff3f8] self-center dark:text-white text-[#7a7d7f]" placeholder="Search..." />
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <Link href={'/dashboard'}>
                            <a className="flex flex-col justify-center dark:text-white text-black mx-3">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    width="24" height="24"
                                    viewBox="0 0 24 24" className="m-auto"
                                > 
                                    <path className="dark:fill-white fill-black" d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
                                </svg>
                                <span className="text-sm mdm:hidden">Home</span>
                                <div className="h-[4px] dark:bg-white mdm:hidden bg-black w-[140%] self-center border-b-1 translate-y-[200%]"></div>
                            </a>
                        </Link>
                        <a className="cursor-pointer flex flex-col justify-center dark:text-[#c6c8c9] dark:hover:text-white hover:text-black text-[#666666] mx-3 group" onClick={
                            () => {
                                error("Invalid Action!");
                            }
                        }>
                            <svg className="m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="24" height="24" >
                                <path className="dark:fill-[#c6c8c9] fill-[#666666] dark:group-hover:fill-white group-hover:fill-black" d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
                            </svg>
                            <span className="text-sm mdm:hidden">My Network</span>
                            <div className="h-[4px] mdm:hidden  w-[140%] self-center border-b-1 translate-y-[200%]"></div>
                        </a>
                        <a className="cursor-pointer mdm:hidden flex flex-col justify-center dark:text-[#c6c8c9] dark:hover:text-white hover:text-black text-[#666666] mx-3 group" onClick={
                            () => {
                                error("Invalid Action!");
                            }
                        }>
                            <svg className="m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="24" height="24" >
                                <path className="dark:fill-[#c6c8c9] fill-[#666666] dark:group-hover:fill-white group-hover:fill-black" d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path>
                            </svg>
                            <span className="text-sm mdm:hidden">Jobs</span>
                            <div className="h-[4px] mdm:hidden  w-[140%] self-center border-b-1 translate-y-[200%]"></div>
                        </a>
                        <a  onClick={
                            () => {
                                error("Invalid Action!");
                            }
                        } className="cursor-pointer flex flex-col justify-center dark:text-[#c6c8c9] dark:hover:text-white hover:text-black text-[#666666] mx-3 group">
                            <svg className="m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="24" height="24" >
                                <path className="dark:fill-[#c6c8c9] fill-[#666666] dark:group-hover:fill-white group-hover:fill-black" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path>
                            </svg>
                            <span className="text-sm mdm:hidden">Messaging</span>
                            <div className="h-[4px] mdm:hidden  w-[140%] self-center border-b-1 translate-y-[200%]"></div>
                        </a>
                        <a onClick={
                            () => {
                                error("Invalid Action!");
                            }
                        } className="cursor-pointer flex flex-col justify-center dark:text-[#c6c8c9] dark:hover:text-white hover:text-black text-[#666666] mx-3 group">
                            <svg className="m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="24" height="24" >
                                <path className="dark:fill-[#c6c8c9] fill-[#666666] dark:group-hover:fill-white group-hover:fill-black" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
                            </svg>
                            <span className="text-sm mdm:hidden">Notifications</span>
                            <div className="h-[4px] mdm:hidden  w-[140%] self-center border-b-1 translate-y-[200%]"></div>
                        </a>
                        <a onClick={
                            () => {
                                error("Invalid Action!");
                            }
                        } className="cursor-pointer mdm:hidden flex flex-col justify-center dark:text-[#c6c8c9] dark:hover:text-white hover:text-black text-[#666666] mx-3 group">
                            <img src="/profile.svg" className="w-[26px] h-[26px] " alt="profile-img" />
                            <span className="text-sm mdm:hidden m-auto">Me</span>
                            <div className="h-[4px] mdm:hidden  w-[140%] self-center border-b-1 translate-y-[200%]"></div>
                        </a>
                        <a onClick={
                            () => {
                                error("Invalid Action!");
                            }
                        } className="cursor-pointer mdm:hidden flex flex-col justify-center dark:text-[#c6c8c9] dark:hover:text-white hover:text-black text-[#666666] mx-5 group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 365 365" height="26" version="1.0">
                                <path className="dark:fill-white fill-black"  d="M 37.5 37.5 L 120 37.5 L 120 120 L 37.5 120 L 37.5 37.5"/>
                                <path className="dark:fill-white fill-black"  d="M 146.21875 37.5 L 228.71875 37.5 L 228.71875 120 L 146.21875 120 L 146.21875 37.5"/>
                                <path className="dark:fill-white fill-black"  d="M 254.933594 37.5 L 337.433594 37.5 L 337.433594 120 L 254.933594 120 L 254.933594 37.5"/>
                                <path className="dark:fill-white fill-black"  d="M 37.5 146.21875 L 120 146.21875 L 120 228.71875 L 37.5 228.71875 L 37.5 146.21875"/>
                                <path className="dark:fill-white fill-black"  d="M 146.21875 146.21875 L 228.71875 146.21875 L 228.71875 228.71875 L 146.21875 228.71875 L 146.21875 146.21875"/>
                                <path className="dark:fill-white fill-black"  d="M 254.933594 146.21875 L 337.433594 146.21875 L 337.433594 228.71875 L 254.933594 228.71875 L 254.933594 146.21875"/>
                                <path className="dark:fill-white fill-black"  d="M 37.5 254.933594 L 120 254.933594 L 120 337.433594 L 37.5 337.433594 L 37.5 254.933594"/>
                                <path className="dark:fill-white fill-black"  d="M 146.21875 254.933594 L 228.71875 254.933594 L 228.71875 337.433594 L 146.21875 337.433594 L 146.21875 254.933594"/>
                                <path className="dark:fill-white fill-black"  d="M 254.933594 254.933594 L 337.433594 254.933594 L 337.433594 337.433594 L 254.933594 337.433594 L 254.933594 254.933594"/>
                            </svg>
                            <span className="text-sm m-auto mdm:hidden">Work</span>
                            <div className="h-[4px]  w-[140%] mdm:hidden self-center border-b-1 translate-y-[200%]"></div>
                        </a>

                        <label className={style.switch}>
                            <input id="check" type="checkbox" onChange={
                                (event)=>{
                                    if(event.target.checked){
                                        // set dark mode
                                        setDark(true)
                                    }
                                    else{
                                        // set light mode
                                        setDark(false)
                                    }

                                }
                            } />
                            <span className={style.round + " " + style.slider }></span>
                        </label>
                    </div>
                </div>
            </header>
            
            <div className="flex mdm:flex-col justify-center gap-8 py-6 md:px-24 mdm:px-5 h-full w-full">
                <div className="flex flex-col md:w-[255px] mdm:w-full">
                    <div className="rounded-lg bg-[#ffffff] dark:bg-[#1e2226]">
                        <img src='https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq' alt="user-background-default" draggable="false" className="rounded-t-lg" />
                        <img src="/profile.svg" draggable="false" alt="Img logo" className="rounded-full w-[64px] h-[64px] m-auto translate-y-[-70%] border-[2px] dark:border-[#1e2226] border-[#ffffff]" />
                        <div className="translate-y-[-25px]">
                            <span id='name-1' className="text-black dark:text-white flex justify-center text-lg hover:underline cursor-pointer">Loading...</span>
                            <span id='email' className="text-black dark:text-[#808284] flex justify-center ">Loading...</span>
                            <div className="mdm:hidden">
                                {linebreak()}
                                <div>
                                    <div className="flex justify-between px-4 dark:text-[#989a9c] text-[#3b3b3b] text-sm font-semibold hover:bg-[#00000014] dark:hover:bg-black py-1">
                                        <p>Who viewed your profile</p>
                                        <span className="text-blue-300">120</span>
                                    </div>
                                    <div className="flex justify-between px-4 dark:text-[#989a9c] text-[#3b3b3b] text-sm font-semibold hover:bg-[#00000014] dark:hover:bg-black py-1">
                                        <p>Views of your post</p>
                                        <span className="text-blue-300">1315</span>
                                    </div>
                                </div>
                                {linebreak()}
                                {notLogged(loggedIn)}
                                <div className="px-4 hover:bg-[#00000014] dark:hover:bg-black py-1 ">
                                    <p className="text-sm dark:text-[#989a9c] text-[#3b3b3b]">Access exclusive tools & insights</p>
                                    <div className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" focusable="false">
                                            <path d="M20 20a3.36 3.36 0 001-2.39V6.38A3.38 3.38 0 0017.62 3H6.38A3.36 3.36 0 004 4z" fill="#f8c77e"></path>
                                            <path d="M4 4a3.36 3.36 0 00-1 2.38v11.24A3.38 3.38 0 006.38 21h11.24A3.36 3.36 0 0020 20z" fill="#e7a33e"></path>
                                        </svg>
                                        <p className="font-semibold dark:text-[#989a9c] text-[#3b3b3b]">Try Premium for free</p>
                                    </div>
                                </div>
                                {linebreak()}
                                <div className="flex mb-6  px-4 hover:bg-[#00000014] text-sm dark:hover:bg-black py-1 dark:text-[#989a9c] text-[#3b3b3b]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="align-middle" viewBox="0 0 16 16" width="24" height="24" focusable="false">
                                        <path className="dark:fill-[#989a9c] fill-[#3b3b3b]"  d="M12 1H4a1 1 0 00-1 1v13.64l5-3.36 5 3.36V2a1 1 0 00-1-1z"></path>
                                    </svg>
                                    <p className="align-middle mx-2">My Items</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 rounded-lg bg-[#ffffff] dark:bg-[#1e2226] mdm:hidden">
                        <p className="px-4 text-blue-500 font-semibold mt-4">Groups</p>
                        <p className="px-4 text-blue-500 font-semibold">Events</p>
                        <p className="px-4 text-blue-500 font-semibold">Followed Hastags</p>
                        {linebreak()}
                        <p className="flex justify-center dark:text-[#989a9c] text-[#3b3b3b] font-bold mb-4">Discover more</p>
                    </div>
                </div>
                <div id="middle-div" className=" mdm:w-full md:w-[550px] flex flex-col">
                    <div className="rounded-lg bg-[#ffffff] dark:bg-[#1e2226]   dark:text-white text-[#3b3b3b] flex flex-col ">
                        <div className="flex w-full mt-4 mx-4">
                            <img src="/profile.svg" alt="user-logo" className="rounded-full w-14 h-14" />
                            <input onClick={
                                ()=>{
                                    toogle();
                                }
                            } type={'text'} placeholder="Start a post"   className="cursor-pointer outline-none bg-[#ffffff] dark:bg-[#1e2226] border-[1px] rounded-full w-full px-4 ml-4 mr-8" />
                        </div>
                        <div className="flex justify-evenly mx-4 mt-1">
                            <div className="flex py-2 px-1 mb-1 rounded-sm hover:dark:bg-[#434150] hover:bg-gray-200 cursor-pointer" onClick={
                                () => {
                                    toogle();
                                }
                            } >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" focusable="false">
                                    <path className="fill-blue-400" d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                                </svg>
                                <span className="mx-2 mdm:text-sm">Photo</span>
                            </div>
                            <div className="flex py-2 px-1 mb-1 rounded-sm hover:dark:bg-[#434150] hover:bg-gray-200 cursor-pointer " onClick={
                                () => {
                                    toogle();
                                }
                            }>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="#7fc15e"  width="24" height="24" focusable="false">
                                    <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"></path>
                                </svg>
                                <span className="mx-2 mdm:text-sm">Video</span>
                            </div>
                            <div className="flex py-2 px-1 mb-1 rounded-sm hover:dark:bg-[#434150] hover:bg-gray-200 cursor-pointer " onClick={
                                () => {
                                    toogle();
                                }
                            }>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="#e7a33e"  width="24" height="24" focusable="false">
                                    <path d="M3 3v15a3 3 0 003 3h12a3 3 0 003-3V3zm13 1.75A1.25 1.25 0 1114.75 6 1.25 1.25 0 0116 4.75zm-8 0A1.25 1.25 0 116.75 6 1.25 1.25 0 018 4.75zM19 18a1 1 0 01-1 1H6a1 1 0 01-1-1V9h14zm-5.9-3a1 1 0 00-1-1H12a3.12 3.12 0 00-1 .2l-1-.2v-3h3.9v1H11v1.15a3.7 3.7 0 011.05-.15 1.89 1.89 0 012 1.78V15a1.92 1.92 0 01-1.84 2H12a1.88 1.88 0 01-2-1.75 1 1 0 010-.25h1a.89.89 0 001 1h.1a.94.94 0 001-.88z"></path>
                                </svg>
                                <span className="mx-2 mdm:text-sm">Event</span>
                            </div>
                            <div className="flex py-2 px-1 mb-1 rounded-sm hover:dark:bg-[#434150] hover:bg-gray-200 cursor-pointer " onClick={
                                () => {
                                    toogle();
                                }
                            }>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="#fc9295" width="24" height="24" focusable="false">
                                    <path d="M21 3v2H3V3zm-6 6h6V7h-6zm0 4h6v-2h-6zm0 4h6v-2h-6zM3 21h18v-2H3zM13 7H3v10h10z"></path>
                                </svg>
                                <span className="mx-2 mdm:text-sm">Write Article</span>
                            </div>
                        </div>
                    </div>
                    <div id="postt" className="rounded-lg  flex flex-col mt-4">
                        {
                            loadImages(data , email)
                        }
                    </div>
                </div>
                <div className="w-[350px] flex flex-col mdm:hidden">
                    <div className="rounded-lg bg-[#ffffff] dark:bg-[#1e2226]  dark:text-white text-[#3b3b3b]">
                        <p className="text-lg font-semibold mt-4 px-4 mb-1">LinkedIn News</p>
                        
                        <div className="px-4 my-2 py-1 hover:bg-[#00000014] dark:hover:bg-black cursor-pointer">
                            <p>&bull; &nbsp; The top career experts to follow</p>
                            <p className="text-[12px] dark:text-[#989a9c] text-[#3b3b3b]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Top news &bull; 17,719 readers</p>
                        </div>
                        <div className="px-4 my-2 py-1 hover:bg-[#00000014] dark:hover:bg-black cursor-pointer">
                            <p>&bull; &nbsp; Indian investors flock to wall st</p>
                            <p className="text-[12px] dark:text-[#989a9c] text-[#3b3b3b]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Top news &bull; 17,719 readers</p>
                        </div>
                        <div className="px-4 my-2 py-1 hover:bg-[#00000014] dark:hover:bg-black cursor-pointer">
                            <p>&bull; &nbsp; Good habits to swear by NFH</p>
                            <p className="text-[12px] dark:text-[#989a9c] text-[#3b3b3b]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Top news &bull; 17,719 readers</p>
                        </div>
                        <div className="px-4 my-2 py-1 hover:bg-[#00000014] dark:hover:bg-black cursor-pointer">
                            <p>&bull; &nbsp; Signs you are Over worked</p>
                            <p className="text-[12px] dark:text-[#989a9c] text-[#3b3b3b]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Top news &bull; 17,719 readers</p>
                        </div>
                        <div className="px-4 my-2 py-1 hover:bg-[#00000014] dark:hover:bg-black cursor-pointer">
                            <p>&bull; &nbsp; The padma winners from corporate world</p>
                            <p className="text-[12px] dark:text-[#989a9c] text-[#3b3b3b]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Top news &bull; 17,719 readers</p>
                        </div>

                    </div>
                    <div className="mt-4 rounded-lg bg-[#ffffff] dark:bg-[#1e2226] mdm:hidden">
                        <img src='/Dashboard-Promo-Image.jpg' className="m-auto" alt="promo-image-st" />
                    </div>
                </div>
            </div>
        </div>
    );
}

const linebreak = () =>{
    return(
        <div className="w-full h-[1px] dark:bg-[#808284] bg-[#a8a7a7] my-3"></div>
    );
}

function toogle()
{
    document.getElementById('new-post-bg').classList.toggle('hidden')
    document.getElementById('new-post').classList.toggle('hidden')
}


function newPost()
{
    const message = document.getElementById('inp-text').value;
    const image = document.getElementById('img-url').value;
    const token = localStorage.getItem('token');

    var url = '/api/addpost'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            message: message,
            image: image
        })
    })
    .then(res => res.json())
    .then(data => {
        var x = document.getElementById("p-err");
        if(data.status === 'success' || data.status === 'ok')
        {
            x.innerHTML = "Post added successfully";
            x.style.color = "green";
            setTimeout(function(){
                x.innerHTML = "";
                toogle();
                window.location.reload();
            }, 2000);
        }
        else if(data.status === 'error')
        {
            x.innerHTML = data.message;
            x.style.color = "red";
            window.location.reload();
        }
        else if(data.status === 'tokenerr')
        {
            x.innerHTML = "User Invalid, Re-login";
            x.style.color = "red";
            localStorage.removeItem('token');
            window.location.reload();
        }
    })
}


function postNew(data , email)
{
    var name = data.name;
    var emaill = data.email;
    var message = data.message;
    var image = data.image;
    var id = data.id;

    return(
        <div className="w-full h-full flex flex-col my-2 bg-[#ffffff] dark:bg-[#1e2226]   dark:text-white text-[#3b3b3b] rounded-md">
            <div className="flex justify-between ">
                <div className="flex mx-4 my-4">
                    <img src="/profile.svg" className="rounded-full w-12 h-12" alt="user-profile-img" />
                    <div className="flex flex-col mx-2">
                        <p className="text-lg hover:underline">{name}</p>
                        <p className="text-xs text-[#8e9193]">{emaill}</p>
                    </div>
                </div>
                <span className="mx-4 self-center align-middle cursor-pointer">&bull;&bull;&bull;</span>
            </div>
            <div>
                <p className="mt-4 px-4 mb-1">{message}</p>
                {
                    // if image 
                    image ? <img src={image} alt={"Image by "+name} /> : null
                }
            </div>
            {linebreak()}
            <div className="flex justify-between mx-8 mb-1">
                <div className="flex hover:bg-gray-300 hover:dark:bg-gray-600 px-4 py-2 rounded-md  cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path className="dark:fill-white fill-black" d="M21.216 8h-2.216v-1.75l1-3.095v-3.155h-5.246c-2.158 6.369-4.252 9.992-6.754 10v-1h-8v13h8v-1h2l2.507 2h8.461l3.032-2.926v-10.261l-2.784-1.813zm.784 11.225l-1.839 1.775h-6.954l-2.507-2h-2.7v-7c3.781 0 6.727-5.674 8.189-10h1.811v.791l-1 3.095v4.114h3.623l1.377.897v8.328z"/>
                    </svg>
                    <p className="mx-4">Like</p>
                </div>
                {checkemail(emaill,email)}
            </div>
        </div>
    );
}

function checkemail(emaill , email)
{
    
    if(email === emaill)
    {
        return(
            <div className="flex hover:bg-gray-300 hover:dark:bg-gray-600 px-4 py-2 rounded-md cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path className="dark:fill-white fill-black" d="M18.5 15c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-5v-1h5v1zm-5-11v4.501c-.748.313-1.424.765-2 1.319v-5.82c0-.552.447-1 1-1s1 .448 1 1zm-4 0v10c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1zm1.82 15h-11.82v-18h2v16h8.502c.312.749.765 1.424 1.318 2zm-6.82-16c.553 0 1 .448 1 1v10c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1zm14-4h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711v2zm-1 2v7.182c-.482-.115-.983-.182-1.5-.182l-.5.025v-7.025h2z"/>
                </svg>
                <p className="mx-4">Delete</p>
            </div>
        );
    }
}




function loadImages(data,email)
{
    let arr = [];
    // loop through the data
    for(let i = 0; i < data.length; i++){
        // push the jsx to the array
        arr.push(postNew(data[i],email));
    }
    // return the array
    arr.reverse();
    return arr;
}

function error(err)
{
    var x = document.getElementById('error_div_main');
    x.classList.toggle(style.excl); 
    var k = document.getElementById('error_div_main_c');
    k.innerHTML = err;
    setTimeout(function(){
        x.classList.toggle(style.excl); 
    }, 5000);
}

function notLogged(loggedIn)
{
    if(!loggedIn)
    {
        return(
            <>
                <div className="px-4 hover:bg-[#00000014] dark:hover:bg-black py-1 cursor-pointer" onClick={
                    () => {
                        window.location.href = "/sign-in";
                    }
                }>
                    <p className="text-sm dark:text-[#989a9c] text-[#3b3b3b]">Login To make Posts</p>
                    
                </div>
            {linebreak()}
            </>
        )
    }
}


export async function getServerSideProps()
{
    const {GETPOST_URL} = process.env;
    
    const res = await fetch(GETPOST_URL+ '/api/posts');
    const data = await res.json();
    
    return {
        props: {
            data,
        },
    };

}