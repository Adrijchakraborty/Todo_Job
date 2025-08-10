import React from 'react'
import { IoLogOutOutline } from "react-icons/io5";
import { CiLight, CiDark  } from "react-icons/ci";

import { useUserStore } from '../../zustand/store'
import "./styles/MainHeader.css"
import { useTheme_logout } from './hooks/useTheme_logout';



const MainHeader: React.FC = () => {
  const user = useUserStore((state) => state.user);
  
  const {theme, setTheme, handleLogout} = useTheme_logout();
  
  return (
    <div className='py-3'>
      <h1 className='header'>Welcome {user?.username}</h1>
      <div className='flex gap-6 justify-center sm:justify-end px-4'>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <span>{theme === 'dark' ? <CiLight/> : <CiDark />}</span>
        </button>
        <button onClick={handleLogout} className='flex items-center'>Logout <IoLogOutOutline/></button>
      </div>
      <span className='flex w-40 py-2 mx-auto border-b border-[var(--border-color)]'></span>
    </div>
  )
}

export default MainHeader