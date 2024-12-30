import React, { useRef, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { registerSchema } from '../model/register';
import { registerUser } from '../api/user';
import { ToastContainer, toast } from 'react-toastify';
import { RxAvatar } from "react-icons/rx";
import { accentColor, border, buttonTextColor, inputBG, inputText, primaryText, secText } from '../constants';

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const formRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const registerFunction = async (e) => {
    e.preventDefault();
    setErrors(registerSchema(formRef));
    if (Object.keys(errors).length !== 0) {
      return;
    }

    toast.info('Registering Your Account');

    const formData = new FormData();
    formData.append('username', formRef.current[0].value);
    formData.append('email', formRef.current[1].value);
    formData.append('password', formRef.current[2].value);
    formData.append('avatar', image);
    formRef.current.reset();

    const res = await registerUser(formData);

    if (res.status >= 400) {
      toast.error(res.response.data.message);
    } else {
      toast.success(res.data.message);
    }
  }

  return (
    <div className='flex justify-center p-5 text-white items-center h-[80vh]'>
      <div className='p-10 rounded-lg mt-10' style={{ border: `1px solid ${border}` }}>
        <div className='flex gap-2 justify-center'>
          <RxAvatar className='text-6xl' />
        </div>
        <h1 className='text-center text-2xl font-bold' style={{ color: primaryText }}>Register Your Account</h1>
        <p className='text-center mt-1' style={{ color: secText }}>Create Your Account And Connect With Other People.</p>
        <form ref={formRef} action="" className='mt-7 flex flex-col gap-2'>
          <div className='flex flex-col'>
            <label style={{ color: secText }} htmlFor="">Username</label>
            <input onChange={() => setErrors({})} type="text" className='text-black px-2 py-1 rounded-sm' style={{ backgroundColor: inputBG, color: inputText, border: `1px solid ${border}` }} />
            {errors.username ? <p className='text-red-500'>{errors.username}</p> : null}
          </div>
          <div className='flex flex-col'>
            <label style={{ color: secText }} htmlFor="">Email Address</label>
            <input onChange={() => setErrors({})} type="email" style={{ backgroundColor: inputBG, color: inputText, border: `1px solid ${border}` }} className='text-black px-2 py-1 rounded-sm' />
            {errors.email ? <p className='text-red-500'>{errors.email}</p> : null}
          </div>
          <div className='flex flex-col relative'>
            <label style={{ color: secText }} htmlFor="">Password</label>
            <FaEye onClick={() => setShowPassword((oldValue) => !oldValue)} className='absolute right-2 bottom-2 text-white hover:cursor-pointer' />
            <input onChange={() => setErrors({})} type={showPassword ? "text" : "password"} className='text-black px-2 py-1 rounded-sm' style={{ backgroundColor: inputBG, color: inputText, border: `1px solid ${border}` }} />
            {errors.password ? <p className='text-red-500'>{errors.password}</p> : null}
          </div>
          <div className='flex flex-col'>
            <label style={{ color: secText }} htmlFor="">Avatar</label>
            <input onChange={handleFileChange} type="file" />
          </div>
          <div>
            <button onClick={registerFunction} style={{ backgroundColor: accentColor, color: buttonTextColor, border: `1px solid ${border}` }} className='mt-3 border w-full px-5 py-2 rounded-sm'>Register</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register