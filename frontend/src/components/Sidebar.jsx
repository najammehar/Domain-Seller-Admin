import { Menu, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../services/authService'
import { getCountRead } from '../services/offerService'
import { getCountRead as mCountRead } from '../services/messageService'


function Sidebar() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = React.useState(false)
    const { count } = useSelector(state => state.offer) 
    const { count: mCount } = useSelector(state => state.message)
    useEffect(() => {
        dispatch(getCountRead());
        dispatch(mCountRead());

    },[dispatch])
    const handleToggle = () => {
        setIsOpen(!isOpen)
    }
    const handleLogout = () => {
        dispatch(logoutUser());
    }


  return (
    <>
    <div className='fixed hidden sm:block w-72 border-r border-gray-500 h-full px-4 '>
            <h1 className='text-orange-500 text-3xl font-bold py-5'>Admin Panel</h1>
            <ul className='space-y-2'>
                <li>
                    <NavLink
                    to='/'
                    className={({isActive}) => `block ${isActive ? 'bg-orange-500': ''} text-gray-100 font-bold hover:text-orange-500 hover:bg-gray-700 hover:bg-opacity-50 p-2 rounded-md`}
                    >
                        Domains
                    </NavLink>
                </li>
                <li className='relative'>
                    <NavLink
                    to='/offers'
                    className={({isActive}) => `block ${isActive ? 'bg-orange-500': ''} text-gray-100 font-bold hover:text-orange-500 hover:bg-gray-700 hover:bg-opacity-50 p-2 rounded-md`}
                    >
                        Offers
                    <span className='ml-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full'>{count}</span>
                    </NavLink>
                </li>
                <li className='relative'>
                    <NavLink
                    to='/messages'
                    className={({isActive}) => `block ${isActive ? 'bg-orange-500': ''} text-gray-100 font-bold hover:text-orange-500 hover:bg-gray-700 hover:bg-opacity-50 p-2 rounded-md`}
                    >
                        Messages
                        <span className='ml-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full'>{mCount}</span>
                    </NavLink>
                </li>
                <li>
                    <div
                    className={`block text-gray-100 cursor-pointer hover:text-orange-500 hover:bg-gray-700 font-bold hover:bg-opacity-50 p-2 rounded-md`}
                    onClick={handleLogout}
                    >
                        Logout
                    </div>
                </li>
                

            </ul>
    </div>
    <nav className='sm:hidden py-5 border-b border-gray-500'>
        <div className='flex justify-between items-center px-4'>
            <h1 className='text-orange-500 text-3xl font-bold'>Admin Panel</h1>
            <Menu size={24} className=' text-gray-100 cursor-pointer' onClick={handleToggle} />
        </div>
    </nav>
    <div className={`fixed transition-all ease-in-out duration-500 ${isOpen ? 'inset-0' : 'inset-y-0 -left-full'} bg-gray-800 z-10 px-6 `}>
            <div className='flex items-center justify-between'>
                <h1 className='text-orange-500 text-3xl font-bold py-5' >Admin Panel</h1>
                <X size={24} className='text-gray-100 cursor-pointer' onClick={handleToggle} />
            </div>
            <ul className='space-y-2'>
                <li>
                    <NavLink
                    to='/'
                    className={({isActive}) => `block ${isActive ? 'bg-orange-500': ''} text-gray-100 font-bold hover:text-orange-500 hover:bg-gray-700 hover:bg-opacity-50 p-2 rounded-md`}
                    >
                        Domains
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to='/offers'
                    className={({isActive}) => `block ${isActive ? 'bg-orange-500': ''} text-gray-100 font-bold hover:text-orange-500 hover:bg-gray-700 hover:bg-opacity-50 p-2 rounded-md`}
                    >
                        Offers
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to='/messages'
                    className={({isActive}) => `block ${isActive ? 'bg-orange-500': ''} text-gray-100 font-bold hover:text-orange-500 hover:bg-gray-700 hover:bg-opacity-50 p-2 rounded-md`}
                    >
                        Messages
                    </NavLink>
                </li>
                <li>
                    <div
                    className={`block text-gray-100 cursor-pointer hover:text-orange-500 hover:bg-gray-700 font-bold hover:bg-opacity-50 p-2 rounded-md`}
                    onClick={handleLogout}
                    >
                        Logout
                    </div>
                </li>
                

            </ul>
    </div>
    </>
    
  )
}

export default Sidebar