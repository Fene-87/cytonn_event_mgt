import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/inertia-react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import axios from 'axios';

export default function Events({ auth, events, errors, countries}) {
    
    const { data, setData } = useForm({
        country_id: '',
        city_id: '',
        title: '',
        venue: '',
        start_date: '',
        end_date: '',
        num_tickets: '',
        description: '',
        cities: []
    });

    const onCountryChange = async (event) => {
        const selectedCountryId = event.target.value;
        // console.log('Selected Country ID:', selectedCountryId);
        setData((prevData) => ({ ...prevData, country_id: selectedCountryId }));

        try {
            const response = await axios.get(`/countries/${event.target.value}`)
        //  setData('country', selectedCountryId);
            setData((prevData) => ({ ...prevData, cities: response.data }));
        } catch (error) {
            console.error(error)
        }
        
    }

    const onSubmit = async (event) => {
        console.log(data);
        event.preventDefault();

        try {
            const response = await axios.post(`/events`, data);
            if (response.status === 200) {
                Inertia.visit(route('events.index'));
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Event</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form 
                       method='POST'
                       action="{{ route('events.store') }}"
                       onSubmit={onSubmit}
                       encType="multipart/form-data"
                       className='p-4 bg-white dark:bg-slate-800 rounded-md'>

                        <div className='grid gap-6 mb-6 md:grid-cols-2'>
                            <div>
                                <label htmlFor="title" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Title</label>
                                <input 
                                  type="text"
                                  id="title"
                                  name="title"
                                  value={data.title}
                                  onChange={(e) => setData('title', e.target.value)}
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500'
                                  placeholder='Event'
                                />
                                {errors.title && <div className='text-sm text-red-400'>{ errors.title }</div>}
                            </div>

                            {/* <div>
                                <label htmlFor="country_id" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Country</label>
                                <select 
                                  id='country_id'
                                  name='country_id'
                                  value={data.country_id}
                                  onChange={onCountryChange}
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500'
                                >
                                    <option >Choose a country</option>
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}

                                </select>
                                {errors.country_id && <div className='text-sm text-red-400'>{ errors.country_id }</div>}
                            </div>

                            <div>
                                <label htmlFor="city_id" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>City</label>
                                <select 
                                  id='city_id'
                                  name='city_id'
                                  value={data.city_id}
                                  onChange={(e) => setData('city_id', e.target.value)}
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500'
                                >
                                    <option >Choose a city</option>
                                    {data.cities.map((city) => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </select>
                                {errors.city_id && <div className='text-sm text-red-400'>{ errors.city_id }</div>}
                            </div> */}

                            <div>
                                <label htmlFor="venue" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Venue</label>
                                <input 
                                  type="text"
                                  id="venue"
                                  name="venue"
                                  value={data.venue}
                                  onChange={(e) => setData('venue', e.target.value)}
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500'
                                  placeholder='Venue'
                                />
                                {errors.venue && <div className='text-sm text-red-400'>{ errors.venue }</div>}
                            </div>

                            <div>
                                <label htmlFor="start_date" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Start date</label>
                                <input 
                                  type="date"
                                  id="start_date"
                                  name="start_date"
                                  value={data.start_date}
                                  onChange={(e) => setData('start_date', e.target.value)}
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500'
                                  placeholder='start_date'
                                />
                                {errors.start_date && <div className='text-sm text-red-400'>{ errors.start_date }</div>}
                            </div>

                            <div>
                                <label htmlFor="end_date" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>End date</label>
                                <input 
                                  type="date"
                                  id="end_date"
                                  name="end_date"
                                  value={data.end_date}
                                  onChange={(e) => setData('end_date', e.target.value)}
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500'
                                  placeholder='end_date'
                                />
                                {errors.end_date && <div className='text-sm text-red-400'>{ errors.end_date }</div>}
                            </div>

                            <div>
                                <label htmlFor="num_tickets" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>No of Tickets</label>
                                <input 
                                  type="number"
                                  id="num_tickets"
                                  name="num_tickets"
                                  value={data.num_tickets}
                                  onChange={(e) => setData('num_tickets', e.target.value)}
                                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500'
                                  placeholder='1'
                                />
                                {errors.num_tickets && <div className='text-sm text-red-400'>{ errors.num_tickets }</div>}
                            </div>

                            <div>
                                <label htmlFor="description" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Description</label>
                                <textarea 
                                  id="description"
                                  name="description"
                                  value={data.description}
                                  onChange={(e) => setData('description', e.target.value)}
                                  rows={4}
                                  className='block p-2.5 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500'
                                  placeholder='Description...'
                                />
                                {errors.description && <div className='text-sm text-red-400'>{ errors.description }</div>}
                            </div>
                        </div>

                        <div>
                            <h3 className='mb-4 font-semibold text-gray-900 dark:text-white'>Tags</h3>
                            <ul className='items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg'></ul>
                        </div>

                        <div>
                            <button
                              type='submit'
                              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md p-2 mt-4'>
                                Submit
                            </button>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                          <Link href={route('events.index')} active={route().current('events.*') ? 'active' : ''}>
                              Back to Events
                          </Link>
                      </div>
                    </form>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    )
}