
import Image from 'next/image';
import Link from 'next/link';

function Header()
{
    return(
        <div className='flex justify-evenly  px-16 '>
            <div className='self-start align-middle w-[50%]'>
                <Link href={'/'}   >
                    <a>
                        <Image 
                            priority
                            src="/logo-with-text.svg" 
                            className='cursor-pointer self-start float-left' 
                            alt="Header-logo" 
                            width={135} 
                            height={100}  
                        />
                    </a>
                </Link>
            </div>
            <div className='flex w-[50%] justify-evenly mdm:hidden'>
                <a href='https://www.linkedin.com/content-hub/' className='group flex flex-col justify-center text-center '>
                    <svg xmlns="http://www.w3.org/2000/svg" className='text-center self-center' width="21" height="20" fill="none" focusable="false">
                        <path className='fill-[#666] group-hover:fill-[#000] transition-all ease-in-out duration-300' d="M18.07 2.93A10 10 0 1 0 3.926 17.07 10 10 0 0 0 18.07 2.93ZM5.34 15.66A8 8 0 1 1 16.66 4.353 8 8 0 0 1 5.34 15.66ZM9 8l-3 7a7 7 0 1 1 9.9-9.9L9 8Zm1.12 2.88a1.24 1.24 0 1 1 1.76-1.747 1.24 1.24 0 0 1-1.76 1.747ZM15.95 15A7 7 0 0 1 6 15l7-3 2.95-6.95a7 7 0 0 1 0 9.95Z" fill="currentColor"></path>
                    </svg>
                    <span className='self-center text-[#666] group-hover:text-[#000] transition-all ease-in-out duration-300' >Discover</span>
                </a>
                <a href='https://www.linkedin.com/pub/dir/+/' className='group flex flex-col justify-center text-center'>
                    <svg xmlns="http://www.w3.org/2000/svg"  className='text-center self-center' width="18" height="20" fill="none" focusable="false">
                        <path className='fill-[#666] group-hover:fill-[#000] transition-all ease-in-out duration-300' d="M9 14v6H0v-6c0-1.7 1.3-3 3-3h3c1.7 0 3 1.3 3 3Zm5.5-3c1.9 0 3.5-1.6 3.5-3.5S16.4 4 14.5 4 11 5.6 11 7.5s1.6 3.5 3.5 3.5Zm1 2h-2c-1.4 0-2.5 1.1-2.5 2.5V20h7v-4.5c0-1.4-1.1-2.5-2.5-2.5ZM4.5 0C2 0 0 2 0 4.5S2 9 4.5 9 9 7 9 4.5 7 0 4.5 0Z" fill="currentColor"></path>
                    </svg>
                    <span className='self-center text-[#666] group-hover:text-[#000] transition-all ease-in-out duration-300' >People</span>
                </a>
                <a href='https://www.linkedin.com/learning/' className='group flex flex-col justify-center text-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='text-center self-center' width="24" height="24" fill="none" focusable="false">
                        <path  className='fill-[#666] group-hover:fill-[#000] transition-all ease-in-out duration-300' d="M23 3H1a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1ZM2 19h20V5H2v14Z" fillOpacity={0.7} fill="currentColor"></path>
                        <path  className='fill-[#666] group-hover:fill-[#000] transition-all ease-in-out duration-300' d="M4 9h6V7H4v2Zm0 4h6v-2H4v2Zm0 4h6v-2H4v2Zm-2 2h10V5H2v14Z" fill="currentColor" fillOpacity={0}></path>
                        <path  className='fill-[#666] group-hover:fill-[#000] transition-all ease-in-out duration-300' d="M14 9h6V7h-6v2Zm0 4h6v-2h-6v2Zm6 4h-6v-2h6v2Z" fill="currentColor" fillOpacity={0}></path>
                        <path  className='fill-[#666] group-hover:fill-[#000] transition-all ease-in-out duration-300' d="M10 7.534v8.933a.28.28 0 0 0 .439.23l6.433-4.436A.307.307 0 0 0 17 12a.305.305 0 0 0-.128-.26l-6.433-4.437a.28.28 0 0 0-.439.23Z" fill="currentColor"></path>
                    </svg>
                    <span className='self-center text-[#666] group-hover:text-[#000] transition-all ease-in-out duration-300' >Learning</span>
                </a>
                <a href='https://www.linkedin.com/jobs/' className='group flex flex-col justify-center text-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='text-center self-center' width="20" height="18" fill="none" focusable="false" >
                        <path className='fill-[#666] group-hover:fill-[#000] transition-all ease-in-out duration-300' d="M15 4V3c0-1.7-1.3-3-3-3H8C6.3 0 5 1.3 5 3v1H0v4c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3V4h-5ZM7 3c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v1H7V3Zm10 9c1.2 0 2.3-.5 3-1.4V15c0 1.7-1.3 3-3 3H3c-1.7 0-3-1.3-3-3v-4.4c.7.9 1.8 1.4 3 1.4h14Z" fill="currentColor"></path>
                    </svg>
                    <span className='self-center text-[#666] group-hover:text-[#000] transition-all ease-in-out duration-300' >Jobs</span>
                </a>
                <div className='w-[1px] border-l-[1px] border-l-[#666] h-[50%] self-center'></div>

                <Link href={'/register'}>
                    <a className='button-grey-bg-a h-fit self-center align-middle'>
                        Join now
                    </a>
                </Link>
                <Link href={'/sign-in'}>
                    <a className='button-blue-border-a h-fit self-center align-middle'>
                        Sign In
                    </a>
                </Link>
            </div>
            <div className='flex w-[50%] justify-evenly md:hidden'>
                <Link href={'/sign-in'}>
                    <a className='button-blue-border-a h-fit self-center align-middle'>
                        Sign In
                    </a>
                </Link>
            </div>

        </div>
    );
}


export default Header;