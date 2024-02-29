import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/inertia-react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import axios from 'axios';

export default function GalleryEdit({ auth, gallery, errors}) {
    const { data, setData } = useForm({
        caption: gallery.caption || '',
        // image: '',
    });

    // const handleImageChange = (e) => {
    //     setData('image', e.target.files[0]);
    // };

    const onSubmit = async (e) => {
        console.log(data);
        e.preventDefault();

        try {
            const response = await axios.put(`/galleries/${gallery.id}`, data);
            if (response.status === 200) {
                Inertia.visit(route('galleries.index'));
            } else {
                console.error('Event creation failed');
            }
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Gallery</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form 
                       method='POST'
                       action="{{ route('galleries.update') }}"
                       onSubmit={onSubmit}
                       encType="multipart/form-data"
                       className='p-4 bg-white dark:bg-slate-800 rounded-md'>

                        <div>
                            <div>
                                <label htmlFor="caption" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Caption</label>
                                <input 
                                  type="text"
                                  id="caption"
                                  name="caption"
                                  value={data.caption}
                                  onChange={(e) => setData('caption', e.target.value)}
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500'
                                />
                                {errors.caption && <div className='text-sm text-red-400'>{ errors.caption }</div>}
                            </div>

                            {/* <div>
                                <label htmlFor="image" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5'>Image</label>
                                <input 
                                  type="file"
                                  accept="image/*"
                                  id="image"
                                  name="image"
                                  value={data.image}
                                  onChange={handleImageChange}
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500'
                                />
                                {errors.image && <div className='text-sm text-red-400'>{ errors.image }</div>}
                            </div> */}
                        </div>

                        <div>
                            <button
                              type='submit'
                              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md p-2 mt-4'>
                                Update
                            </button>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                          <Link href={route('galleries.index')} active={route().current('galleries.*') ? 'active' : ''}>
                              Back to Galleries
                          </Link>
                      </div>
                    </form>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    )
}