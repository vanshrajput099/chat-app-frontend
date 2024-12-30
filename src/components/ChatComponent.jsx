import React from 'react'
import ChatComponentHeader from './ChatComponentHeader'
import ChatSection from './ChatSection'
import ChatSendInput from './ChatSendInput'
import { useSelector } from 'react-redux'
import { border, primaryText, secText } from '../constants'
import { Rings, ThreeDots } from 'react-loader-spinner';
import { BsChatSquareDotsFill } from "react-icons/bs";

const ChatComponent = () => {
  const store = useSelector(store => store.message);

  if (store.messageUser === null) {
    return (
      <div style={{ border: `1px solid ${border}` }} className='w-2/3 text-white h-full flex flex-col items-center justify-center'>
        <BsChatSquareDotsFill  className='animate-updown text-7xl' />
        <p className='mt-2 text-2xl font-bold' style={{color:primaryText}}>Welcome To Chat.</p>
        <p className='mt-1' style={{color:secText,fontWeight:'200'}}>Click On Any User And Start Your Chatting.</p>
      </div>
    )
  }


  return (
    <div style={{border:`1px solid ${border}`}} className='w-2/3 h-full flex flex-col justify-between'>
      <ChatComponentHeader />
      <ChatSection />
      <ChatSendInput />
    </div>
  )
}

export default ChatComponent