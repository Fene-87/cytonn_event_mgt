import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Guest from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import axios from 'axios';

export default function EventDetails({ auth, event, like }) {
    // const handleLikes = async () => {
    //     try {
    //         const response = await axios.post(`like-event/${event.id}`);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Home" />
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/home">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href="/home">
                                    Events
                                </NavLink>
                            </div>
                        </div>
                            {auth.user ? (
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            ) : (
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink href="/home">
                                        Login
                                    </NavLink>
                                </div>
                            )}
                            
                        

                    </div>

                </div>
            </nav>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="bg-white dark:bg-gray-900">
                            <div className="container px-6 py-10 mx-auto">
                                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">{event.title}</h1>
                   
                                <div className='mb-16 flex fle-wrap'>
                                    <div className='mb-6 w-full shrink-0 basis-auto lg:mb-0 lg:w-6/12 lg:pr-6'>
                                        <div className='flex flex-col'>
                                            <div className='ripple relative overflow-hidden rounded-lg bg-cover bg-[50%] bg-no-repeat shadow-lg'>
                                                <img src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="event-img" className='w-full' />
                                            </div>

                                            {auth.user ? (
                                                <div className='flex space-x-2 p-4'>
                                                    <button 
                                                      type="button" 
                                                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none p-2 rounded-md"
                                                    //   onClick={handleLikes}
                                                    >
                                                        Like
                                                        
                                                    </button>
                                                    <buton type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none p-2 rounded-md">Save</buton>
                                                    <buton type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none p-2 rounded-md">Attending</buton>
                                                </div>
                                            ) : (
                                                <div className='flex space-x-2 p-4 items-center'>
                                                    <h3>Login to:</h3>
                                                    <buton type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none p-2 rounded-md">Like</buton>
                                                    <buton type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none p-2 rounded-md">Save</buton>
                                                    <buton type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none p-2 rounded-md">Attending</buton>
                                                </div>
                                            )}
                                            

                                            <div className='flex flex-col p-4'>
                                                <span className='text-indigo-600 font-semi-bold'>Host Information</span>
                                                <div className='flex space-x-4 mt-6 bg-slate-200 rounded-md p-2'>
                                                    <div className='flex flex-col'>
                                                        <span className='text-2xl'>{event.user.name}</span>
                                                        <span className='text-2xl'>{event.user.email}</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full shrink-0 grow-0 basis-auto lg:w-6/12 lg:pl-6'>
                                        <h3 className='mb-4 text-2xl font-bold'>Welcome to {event.title}</h3>
                                        <div className='mb-4 flex items-center text-sm font-medium text-danger dark:text-danger-500'>
                                            {event.country.name}, {event.city.name}
                                        </div>
                                        <p className='mb-6 text-sm text-neutral-500 dark:text-neutral-400'>{event.start_date}</p>
                                        <p className='mb-6 text-neutral-500 dark:text-neutral-400'>{event.description}</p>
                                        {auth.user ? (
                                            <div className='container flex justify-center items-center w-50 mt-6 bg-slate-200 p-4 rounded-md'>
                                            <div>
                                                <form 
                                                  action="" 
                                                  className='flex justify-between sace-x-2'
                                                  method='POST'
                                                >
                                                    <input 
                                                      type="text"
                                                      name='comment'
                                                      id='comment'
                                                      placeholder='comment'
                                                      className='flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                                    />
                                                    <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"'>
                                                        Post
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                        ) : (
                                            <div className='container flex justify-between items-center w-50 mt-6 bg-slate-200 p-4 rounded-md'>
                                            <h3>Login to Comment</h3>
                                            <div>
                                                <form 
                                                  action="" 
                                                  className='flex justify-between sace-x-2'
                                                  method='POST'
                                                >
                                                    <input 
                                                      type="text"
                                                      name='comment'
                                                      id='comment'
                                                      placeholder='comment'
                                                      className='flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                                    />
                                                    <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"'>
                                                        Post
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                </div>
                                
                                
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
