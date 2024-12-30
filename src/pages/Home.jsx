import React from 'react'
import HomeSideBar from '../components/HomeSideBar'
import ChatComponent from '../components/ChatComponent'

const Home = () => {
  return (
    <div className='flex items-center h-[85vh] px-28 justify-center mt-5'>
      <HomeSideBar />
      <ChatComponent />
    </div>
  )
}

export default Home