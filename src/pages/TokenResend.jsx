import React, { useState } from 'react'
import { accentColor, border, buttonTextColor, inputBG, inputText, lightText, secText } from '../constants'
import { CiMail } from "react-icons/ci";
import { resendToken } from '../api/user';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const TokenResend = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleResendToken = async () => {
        if (email.length === 0) {
            setError("*Email is required");
            return;
        }
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            setError("*Wrong Gmail input");
            return;
        }
        setEmail("");
        toast.info("Sending Mail");
        const res = await resendToken(email);
        if (res.status >= 400) {
            toast.error(res.response.data.message);
        } else {
            toast.success(res.data.message);
        }
    }
    return (
        <div className='flex w-full h-[80vh] items-center justify-center'>
            <div className='flex flex-col items-center gap-2 p-5 w-2/5' style={{ border: `1px solid ${border}` }}>
                <label className='text-white text-2xl font-bold flex items-center gap-2' htmlFor=""> <CiMail /> Email Address</label>
                <p style={{ color: secText, fontWeight: '200' }} className='text-center'>Check Your Spam Folder If You Didn't Find The Verification Mail.</p>
                <input value={email} onChange={(e) => { setError(""); setEmail(e.target.value); }} placeholder='Your Email Address..' className='w-full px-2 py-1 mt-2' style={{ backgroundColor: inputBG, color: inputText, border: `1px solid ${border}` }} type="email" name="" id="" />
                {error.length !== 0 ? <p className='text-red-600'>{error}</p> : null}
                <button onClick={handleResendToken} className='px-3 py-1 w-1/3 rounded-lg mt-2' style={{ backgroundColor: accentColor, color: buttonTextColor }}>Submit</button>
                <p className='text-sm' style={{ color: lightText }}>Already Verified ? <Link to={"/login"}><span style={{ color: secText }}>Login</span></Link></p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default TokenResend