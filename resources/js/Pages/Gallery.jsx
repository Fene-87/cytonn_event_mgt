import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

export default function Gallery({ auth, galleries}) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this gallery?')) {
            Inertia.delete(route('galleries.destroy', id), {
                onSuccess: () => window.location.reload(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Galleries</h2>}
        >
            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex ">
                <Link href="/galleries/new" className="text-gray-400 hover:text-gray-600 text-3xl">
                    Add Gallery
                </Link>
            </div>
            <Head title="Gallery" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                            <thead className='text-lg text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>Image</th>
                                    <th scope='col' className='px-6 py-3'>Caption</th>
                                    <th scope='col' className='px-6 py-3'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {galleries && galleries.length > 0 ? (
                                     galleries.map((gallery) => (
                                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                            <img src={`/storage/app/public/${gallery.image}`} alt={gallery.image}  />
                                        </th>
                                        <td className='px-6 py-4'>
                                            {gallery.caption}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <Link href={route('galleries.edit', { gallery: gallery.id })} active={route().current('galleries.*') ? 'active' : ''} className="text-green-400 hover:text-green-600">
                                                Edit
                                            </Link>
                                            <span> | </span>
                                            <button onClick={() => handleDelete(gallery.id)} className="text-red-400 hover:text-red-600">
                                               Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                ) : (
                                    <tr>
                                        <td className='px-6 py-4 text-center text-gray-500 dark:text-gray-400'>
                                            No Gallery Found
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