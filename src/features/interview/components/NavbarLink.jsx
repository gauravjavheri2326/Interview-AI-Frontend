import React, { useState } from 'react'
import { NavLink } from 'react-router'


const NavbarLink = ({link, name, end, icon: Icon}) => {
    const [isActive, setIsActive] = useState(false)

  return (
    <div className='lg:w-full'>
        {/* working on */}
        <NavLink 
            to={link}
            end={end} 
            className={`text-[#FFB2B8]`}>
            
            {({isActive}) => (
                <div className={`lg:w-full lg:px-[1vw] lg:py-[.8vw] p-[2vw] rounded-xl 2xl:text-[1.1vw] xl:text-[1.3vw] lg:text-[1.5vw] flex items-center gap-[0.5vw]   hover:bg-[#39485A] focus:bg-[#E61E50] transition-all duration-200 ease-linear ${
                    isActive
                  ? "bg-[#E61E50] hover:bg-[#E61E50] font-bold text-[#FFECED]"
                  : " bg-transparent text-[#FFB2B8]"
                }
                    
                `}>
                    <Icon 
                        className="2xl:size-[1.2vw] lg:size-[1.6vw] size-[4.5vw]"
                        strokeWidth={isActive ? 3.5 : 2}
                    />
                    <p className='lg:block hidden'>{name}</p>
                </div>
            )}
            
        </NavLink>
    </div>
  )
}

export default NavbarLink