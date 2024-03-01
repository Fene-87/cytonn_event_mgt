import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Guest from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function Dashboard({ auth, events }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Home" />
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href="/home/events">
                                    All Events
                                </NavLink>
                            </div>
                            {auth.user && (
                                <div className="flex">
                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                        <NavLink href="/liked-events">
                                            Liked Events
                                        </NavLink>
                                    </div>
                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                        <NavLink href="/saved-events">
                                            Saved
                                        </NavLink>
                                    </div>
                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                        <NavLink href="/attending-events">
                                            Attending
                                        </NavLink>
                                    </div>

                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                        <NavLink href="/admin/events">
                                            Admin
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                        </div>
                        {auth.user ? (
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        ) : (
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href="/auth">
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
                                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Latest Events!!</h1>
                   
                                <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
                                    {events.map((event) => (
                                        <div className="lg:flex">
                                            <img className="object-cover w-full h-56 rounded-lg lg:w-64 border" src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Event-img" />

                                            <div className="flex flex-col justify-between py-6 lg:mx-6">
                                                <a href={route('details', { event: event.id })} className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                                                    {event.title}
                                                </a>

                                            
                                                
                                                <span className="text-sm text-gray-500 dark:text-gray-300">VIP-{event.vip_price}/= | Regular-{event.regular_price}/=</span>

                                                <span className="text-sm text-gray-500 dark:text-gray-300">{event.city.name}</span>
                                                <span className="text-sm text-gray-500 dark:text-gray-300">On: {event.start_date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
