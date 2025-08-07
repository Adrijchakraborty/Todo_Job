import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserStore } from '../zustand/store';

const ProtectedAuth: React.FC = () => {
    const user = useUserStore((state) => state.user);
    return user ? <Navigate to={'/'}/> : <Outlet /> 
}

export default ProtectedAuth