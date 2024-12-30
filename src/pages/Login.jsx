import React, { useRef, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { loginSchema } from '../model/login';
import { ToastContainer, toast } from 'react-toastify';
import { loginUser } from '../api/user';
import { useDispatch, useSelector } from "react-redux";
import { changeIsLogginIn, setAuthUser } from '../redux/features/user';
import { RxAvatar } from "react-icons/rx";
import { accentColor, border, buttonTextColor, inputBG, inputText, lightText, primaryText, secText, surfaceCardColor } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const store = useSelector(store => store.user);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const loginFunction = async (e) => {
    e.preventDefault();
    setErrors(loginSchema(formRef));
    if (Object.keys(errors).length !== 0) {
      return;
    }

    toast.info('Logging Your Account');
    dispatch(changeIsLogginIn(true));
    const formData = { username: formRef.current[0].value, password: formRef.current[1].value };
    formRef.current.reset();

    const res = await loginUser(formData);
    dispatch(changeIsLogginIn(false));
    if (res.status >= 400) {
      toast.error(res.response.data.message);
    } else {
      dispatch(setAuthUser(res.data.data));
      toast.success(res.data.message);
    }
  }

  if (store.isLogginIn) {
    return (
      <div className='flex justify-center p-5 text-white items-center h-[80vh]'>
        <Rings
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="rings-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )
  }

  return (
    <div className='flex justify-center p-5 text-white items-center h-[80vh]'>
      <div className='p-10 rounded-lg w-1/4' style={{ backgroundColor: surfaceCardColor, border: `1px solid ${border}` }}>
        <div className='flex gap-2 justify-center'>
          <RxAvatar className='text-6xl' />
        </div>
        <h1 className='font-bold text-2xl text-center mt-3' style={{ color: primaryText }}>Login Your Account</h1>
        <p className='text-center mt-1' style={{ color: secText, fontWeight: '200' }}>Start Chatting With People.</p>
        <form ref={formRef} action="" className='mt-5 flex flex-col gap-2'>
          <div className='flex flex-col'>
            <label style={{ color: secText }} htmlFor="">Username</label>
            <input onChange={() => setErrors({})} type="text" className='text-black px-2 py-1 rounded-sm' style={{ backgroundColor: inputBG, color: inputText, border: `1px solid ${border}` }} />
            {errors.username ? <p className='text-red-500'>{errors.username}</p> : null}
          </div>
          <div className='flex flex-col relative'>
            <label style={{ color: secText }} htmlFor="">Password</label>
            <FaEye onClick={() => setShowPassword((oldValue) => !oldValue)} className='absolute right-2 bottom-2 hover:cursor-pointer' style={{ color: inputText }} />
            <input onChange={() => setErrors({})} type={showPassword ? "text" : "password"} className='px-2 py-1 rounded-sm' style={{ backgroundColor: inputBG, color: inputText, border: `1px solid ${border}` }} />
            {errors.password ? <p className='text-red-500'>{errors.password}</p> : null}
          </div>
          <div>
            <button onClick={loginFunction} className='w-full px-5 py-2 rounded-sm mt-3' style={{ backgroundColor: accentColor, color: buttonTextColor, border: `1px solid ${border}` }}>Login</button>
          </div>
          <p className='text-sm' style={{ fontWeight: '400', color: lightText }}>Want To Resend Verification Mail. <Link to={"/token-resend"}><span style={{ color: secText }}>Resend</span></Link> </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login