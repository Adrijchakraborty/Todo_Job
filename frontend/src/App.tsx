import React from 'react'
import Auth from './pages/Auth'

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 font-poppins">
      <Auth />
    </div>
  )
}

export default App