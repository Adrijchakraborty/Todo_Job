import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserStore } from '../zustand/store';

const ProtectedMain: React.FC = () => {
    const user = useUserStore((state) => state.user);
    return !user ? <Navigate to={'/auth'}/> : <Outlet /> 
}

export default ProtectedMain