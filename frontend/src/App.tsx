import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ProtectedMain from './routes/ProtectedMain'
import ProtectedAuth from './routes/ProtectedAuth'
import { useAppHook } from './hooks/useAppHook'
import Loader from './skeleton/Loader'
import { AuthPage, MainPage } from './pages'

const App: React.FC = () => {

  useAppHook();

  return (
    <React.Suspense fallback={<Loader/>}>
      <Routes>
        <Route element={<ProtectedMain />}>
          <Route path='/' element={<MainPage />} />
        </Route>
        <Route element={<ProtectedAuth />}>
          <Route path='/auth' element={<AuthPage />} />
        </Route>
      </Routes>
    </React.Suspense>
  )
}

export default App