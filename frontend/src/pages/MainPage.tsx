import React from 'react'
import { AddItems, DisplayItems, MainHeader } from '../components'

const MainPage: React.FC = () => {
  return (
    <main className='h-screen flex flex-col'>
      <MainHeader/>
      <AddItems/>
      <DisplayItems/>
      <section className='text-center flex justify-center'><h1 className='font-bold'>Made By:</h1> Adrij Chakraborty</section>
    </main>
  )
}

export default MainPage