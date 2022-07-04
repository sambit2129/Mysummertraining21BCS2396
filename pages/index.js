import Head from 'next/head'
import Header from '../components/Header'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'


export default function Home() {

  useEffect (()=>{
    var token = localStorage.getItem('token');
    if(token)
    {
      window.location.href = '/dashboard';
    }
  })

  return (
    <>
      <Head>
        <title>LinkedIn: Log In or Sign Up </title>
        <meta name="description" content="A LinkedIn clone by Sambit Kumar Pathy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <header className='w-full bg-[#f3f4f6]'>
        <Header />
      </header>
      
      <main className='w-full h-full bg-[#f3f4f6]'>

        <div className='flex justify-evenly mdm:flex-col'>
            <div className='md:w-1/2 ml-16'>
              <h1 className='leading-head'>Welcome to your professional community</h1>
              <div>
                  <Link href={'/login'}><a className='cursor-pointer'>
                    <div className='bg-[#fff] md:w-[75%] mdm:w-[90%] rounded-lg flex justify-between my-3'>
                        <p className='p-4 font-semibold'>Search for a Job</p>
                        <svg className='h-full my-auto mx-4' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/>
                        </svg>
                    </div>
                  </a></Link>
                  <Link href={'/login'}><a className='cursor-pointer'>
                    <div className='bg-[#fff] md:w-[75%] mdm:w-[90%] rounded-lg flex justify-between my-3'>
                        <p className='p-4 font-semibold'>Learn a new Skill</p>
                        <svg className='h-full my-auto mx-4' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/>
                        </svg>
                    </div>
                  </a></Link>
                  <Link href={'/login'}><a className='cursor-pointer'>
                    <div className='bg-[#fff] md:w-[75%] mdm:w-[90%] rounded-lg flex justify-between my-3'>
                        <p className='p-4 font-semibold'>Find a person you know</p>
                        <svg className='h-full my-auto mx-4' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/>
                        </svg>
                    </div>
                  </a></Link>
                  
              </div>

            </div>
            <div className='w-1/2 mdm:ml-16 block mdm:mt-16'>
              <Image
                  src='/Landing-Page-Stock-Image.svg'
                  width='700px'
                  height='560px'
                  layout='responsive'
                  sizes='100vw'
                  alt='LinkedIn Main Page Stock Image'
                  draggable='false'
                  
                />
            </div>
        </div>

      </main>
      
    </>
  )
}
