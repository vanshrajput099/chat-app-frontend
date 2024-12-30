import React, { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../api/messages';
import { addMessage, changeLoadingMessagesFalse, changeLoadingMessagesTrue, setMessages } from '../redux/features/message';
import { border, secText } from '../constants';
import { FaRegMessage } from "react-icons/fa6";
import { Rings } from 'react-loader-spinner';

const ChatSection = () => {

    const store = useSelector(store => store.message);
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();


    const subscribeMessage = () => {
        const socket = user.socket;
        socket.on("newMessage", (message) => {
            if (message.senderId !== store.messageUser._id) {
                return;
            }
            dispatch(addMessage(message));
        })
    }

    const getAllMessages = async () => {
        dispatch(changeLoadingMessagesTrue());
        const res = await getMessages(store.messageUser._id);
        dispatch(setMessages(res.data.data));
        dispatch(changeLoadingMessagesFalse());
    }

    useEffect(() => {
        getAllMessages();
        subscribeMessage();
    }, [store.messageUser])

    if (store.isLoadingMessages) {
        return (
            <div className='border h-full overflow-y-auto p-3 flex flex-col gap-4 text-white items-center justify-center'>
                <Rings
                    visible={true}
                    height="150"
                    width="150"
                    color="#4fa94d"
                    ariaLabel="rings-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                <h1>Loading Messages..</h1>
            </div>
        )
    }

    return (
        <div style={{ border: `1px solid ${border}`, }} className='custom-scrollbar h-full overflow-y-auto p-3 flex flex-col gap-4'>
            {
                store.messages.length === 0 ?
                    <>
                        <div className='w-full h-full gap-1 flex flex-col items-center justify-center'>
                            <FaRegMessage className='text-white text-4xl' />
                            <h1 style={{ color: secText }} className='text-2xl'>No Messages..</h1>
                            <h3 style={{ color: secText, fontWeight: '200' }}>Became the first to text</h3>
                        </div>
                    </>
                    :
                    store.messages.map((ele, index) => {
                        return <ChatMessage data={ele} key={index} />
                    })
            }
        </div>
    )
}

export default ChatSection