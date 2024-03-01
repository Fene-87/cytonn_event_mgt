import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

export default function LikedEvents({ auth, events}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Attending Events</h2>}
        >
            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                {/* <NavLink href={route('events.index')} active={route().current('events.*')}>
                    Events
                </NavLink> */}
            </div>
            <Head title="Attending" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                            <thead className='text-lg text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>Title</th>
                                    <th scope='col' className='px-6 py-3'>Start Date</th>
                                    <th scope='col' className='px-6 py-3'>City</th>
                                    <th scope='col' className='px-6 py-3'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events && events.length > 0 ? (
                                     events.map((event) => (
                                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                            {event.title}
                                        </th>
                                        <td className='px-6 py-4'>
                                            {event.start_date}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {event.city.name}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <Link href={route('details', { event: event.id })} active={route().current('events.*') ? 'active' : ''} className="text-green-400 hover:text-green-600">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                                ) : (
                                    <tr>
                                        <td className='px-6 py-4 text-center text-gray-500 dark:text-gray-400'>
                                            No Events Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}