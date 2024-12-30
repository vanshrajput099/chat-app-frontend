import React, { useRef, useState } from 'react'
import { FaImages } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { sendMessage } from '../api/messages';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/features/message';
import { border, secBackgroundColor } from '../constants';

const ChatSendInput = () => {

    const fileRef = useRef(null);
    const store = useSelector(store => store.message);
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");
    const dispatch = useDispatch()

    const sendMessageFunction = async () => {
        if (text === "" && !image) {
            return;
        }

        const data = new FormData();
        data.append("image", image);
        data.append("text", text);
        setImage(null);
        setText("");

        const res = await sendMessage(store.messageUser._id, data);
        dispatch(addMessage(res.data.data))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <div style={{ border: `1px solid ${border}`,backgroundColor:secBackgroundColor }} className='justify-self-end text-white p-3 flex items-center'>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='Write your message..' style={{ border: `1px solid ${border}`,resize:'none' }} className='w-5/6 bg-transparent rounded-lg px-3 py-1' />
            <div className='flex justify-around w-1/6'>
                <FaImages onClick={() => fileRef.current.click()} className='text-3xl hover:cursor-pointer' />
                <input className='hidden' onChange={handleFileChange} ref={fileRef} type="file" name="" id="" />
                <IoMdSend onClick={!image && text.length === 0 ? null : sendMessageFunction} className={`text-3xl ${!image && text.length === 0 ? 'text-gray-700' : 'hover:cursor-pointer text-gray-200'}`} />
            </div>
        </div>
    );
}

export default ChatSendInput;
