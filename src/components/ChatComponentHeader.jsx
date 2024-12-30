import React from 'react'
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setBackMessage } from '../redux/features/message';
import { accentColor, buttonTextColor, secBackgroundColor, secText } from '../constants';
import { GoDotFill } from 'react-icons/go';
import moment from 'moment-timezone';

const ChatComponentHeader = () => {

  const store = useSelector(store => store.message);
  const dispatch = useDispatch();
  console.log(store.messageUser);
  const istTime = moment(store.messageUser.updatedAt).tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
  const time = (istTime.split(" ")[1].substring(0, 5));
  const onlineStatus = (store.onlineUsers.includes(store.messageUser._id))

  const backChatFunction = () => {
    dispatch(setBackMessage());
  }

  return (
    <div style={{ backgroundColor: secBackgroundColor }} className='flex justify-between p-4 text-white items-center justify-self-start'>
      <div className='flex gap-2 items-center'>
        <img className='w-11 h-11 rounded-full' src={store.messageUser.avatar.split("-")[0]} alt="" />
        <div className='flex'>
          {onlineStatus ? <GoDotFill className='text-green-600 text-3xl' /> : null}
          <div>
            <h1 style={{ color: secText }} className='text-xl font-bold'>{store.messageUser.username}</h1>
            <h1>{onlineStatus ? "Online" : `Last Online : ${time}`}</h1>
          </div>
        </div>
      </div>
      <div>
        <ImCross className="hover:cursor-pointer text-white" onClick={backChatFunction} />
      </div>
    </div>
  )
}

export default ChatComponentHeader