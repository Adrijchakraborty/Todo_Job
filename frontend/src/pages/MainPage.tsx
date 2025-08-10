import React from 'react'
import { AddItems, DisplayItems, MainHeader } from '../components'

const MainPage: React.FC = () => {
  return (
    <main>
      <MainHeader/>
      <AddItems/>
      <DisplayItems/>
    </main>
  )
}

export default MainPage