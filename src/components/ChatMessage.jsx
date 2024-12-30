import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { accentColor, border, buttonTextColor, primaryText, secText } from '../constants';

const ChatMessage = ({ data }) => {

    const store = useSelector(store => store.user);
    const messages = useSelector(store => store.message);
    const istTime = moment(data.createdAt).tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
    const time = (istTime.split(" ")[1].substring(0, 5));
    const messageEndRef = useRef();

    useEffect(() => {
        if (messageEndRef.current && messages.messages) {
            messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
        }
    }, [messages.messages]);

    if (store.authUser._id !== data.senderId) {
        return (
            <div ref={messageEndRef} className='flex gap-2 text-white items-center'>
                <img className='w-7 h-7 rounded-full' src={messages.messageUser.avatar.split("-")[0]} alt="" />
                <div>
                    <h3 style={{ fontWeight: '200' }} className='text-left text-sm mt-1'>{time}</h3>
                    {
                        data.image ? <img className='w-24 h-24' src={data.image.split("-")[0]} alt="" /> : null
                    }
                    {
                        data.message.length > 0 ? <p className='w-fit p-2 rounded-lg' style={{ border: `1px solid ${border}` }}>{data.message}</p> : null
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='flex gap-2 text-white self-end items-center'>
            <div>
                <h3 style={{ fontWeight: '200' }} className='text-right text-sm mt-1'>{time}</h3>
                {
                    data.image ? <img className='w-24 h-24' src={data.image.split("-")[0]} alt="" /> : null
                }
                {
                    data.message.length > 0 ? <p className='w-fit p-2 rounded-lg' style={{ color: buttonTextColor, backgroundColor: accentColor, border: `1px solid ${border}` }}>{data.message}</p> : null
                }
            </div>
            <img className='w-7 h-7 rounded-full' src={store.authUser.avatar.split("-")[0]} alt="" />
        </div>
    )
}

export default ChatMessage