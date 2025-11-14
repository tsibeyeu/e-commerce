import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    const [Visible, setVisible] = useState(false);
  return (
    <div className='flex justify-between items-center py-5 font-medium'>
       <Link to={"/"}>
        <img src={assets.logo}  className="w-36" alt="" />
       </Link>
        <ul className='hidden md:flex gap-8 text-lg text-gray-700'>
            <NavLink onClick={()=>setVisible(false)} to="/" className="flex gap-1 flex-col item-ceter">
                <p>Home</p>
                <hr className='h-[1.5px] w-2/4 bg-gray-500  border-none hidden'/>
            </NavLink>
            <NavLink onClick={()=>setVisible(false)} to="/collection" className="flex gap-1 flex-col item-ceter">
                <p>Collection</p>
                <hr className='h-[1.5px] w-2/4 bg-gray-500  border-none hidden'/>
            </NavLink>
            <NavLink onClick={()=>setVisible(false)} to="/about" className="flex gap-1 flex-col item-ceter">
                <p>About</p>
                <hr className='h-[1.5px] w-2/4 bg-gray-500  border-none hidden'/>
            </NavLink>
            <NavLink onClick={()=>setVisible(false)} to="/contact" className="flex gap-1 flex-col item-ceter">
                <p>Contact</p>
                <hr className='h-[1.5px] w-2/4 bg-gray-500  border-none hidden'/>
            </NavLink>
           

        </ul>
        <div className='flex items-center gap-4'> 
            <img src={assets.search_icon} alt="search" className='w-5  cursor-pointer'/>
            <div className='group relative'>
                <img className='cursor-pointer w-5' src={assets.profile_icon} alt="profile" />
                <div className='absolute group-hover:block hidden  right-0  pt-4'>
                    <div className='flex flex-col w-36 py-5 px-3 gap-2 text-gray-500 bg-slate-100 rounded '>
                        <p className='cursor-pointer hover:text-black'>My profile</p>
                        <p className='cursor-pointer hover:text-black'>Orders</p>
                        <p className='cursor-pointer hover:text-black'> Logout</p>

                        
                    </div>
                </div>
            </div>
            <Link to='/cart' className='relative flex items-center'>
                <img src={assets.cart_icon} alt="cart icon" className='w-5 min-w-5' />
                <span className='absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                    10
                </span>
            </Link>
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='cursor-pointer sm:hidden w-5' alt="menu icon" />
        </div>
        {/* small screen menu */}
        <div className={`absolute right-0 top-0 bottom-0 overflow-hidden transition-all bg-white ${Visible ? `w-full`:`w-0`}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center cursor-pointe  gap-4 p-3'>
                    <img src={assets.dropdown_icon} className='h-4 rotate-180 ' alt="" />
                    <p>Back</p>
                </div>

                <NavLink onClick={()=>setVisible(false)} to="/" className="p-4 border-t border-gray-200">Home</NavLink>
                <NavLink onClick={()=>setVisible(false)} to="/collection" className="p-4 border-t border-gray-200">Collection</NavLink>
                <NavLink onClick={()=>setVisible(false)} to="/about" className="p-4 border-t border-gray-200">About</NavLink>
                <NavLink onClick={()=>setVisible(false)} to="/contact" className="p-4 border-t border-gray-200">Contact</NavLink>

            </div>

        </div>
    </div>
  )
}

export default Navbar
