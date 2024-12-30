import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { backgroundColor } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './api/user';
import { changeCheckingAuth, setAuthUser, setSocket } from './redux/features/user';
import { io } from "socket.io-client";
import { removeOnlineUser, setOnlineUsers } from './redux/features/message';
import { Rings, ThreeDots } from 'react-loader-spinner'
import TokenResend from './pages/TokenResend';

const App = () => {

  const store = useSelector(store => store.user);
  const [loginPage, setLoginPage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = async () => {
      const res = await checkAuth();
      if (res.status < 400) {
        dispatch(setAuthUser(res.data.data));
      } else {
        dispatch(setAuthUser(null));
      }
      dispatch(changeCheckingAuth());
    };
    auth();
  }, [dispatch]);

  useEffect(() => {
    if (store.authUser && !store.socket) {
      const backend = "http://localhost:4000/";
      const socket = io(backend, {
        withCredentials: true,
        query: {
          userId: store.authUser._id,
        },
      });
      socket.connect();
      dispatch(setSocket(socket));
      socket.on("onlineUsers", (data) => {
        dispatch(setOnlineUsers(data));
      })
      socket.on("disconnectUser", (data) => {
        dispatch(removeOnlineUser(data));
      });
    }
  }, [store.authUser, store.socket, dispatch])

  if (store.isCheckingAuth && !store.authUser) {
    return (
      <div className='w-full h-[100vh] flex justify-center items-center flex-col' style={{ backgroundColor: backgroundColor }}>
        <Rings
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="rings-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <div className='text-white font-bold text-3xl flex items-center gap-4'>
          Loading
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          /></div>
      </div>
    );
  }

  return (
    <div className='w-full h-[100vh]' style={{ backgroundColor: backgroundColor, fontFamily: "Poppins" }}>
      <Navbar loginPage={loginPage} setLoginPage={setLoginPage} />
      <Routes>
        <Route path="/" element={store.authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={store.authUser ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={store.authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/profile" element={store.authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/token-resend" element={store.authUser ? <Navigate to="/" /> : <TokenResend />} />
      </Routes>
    </div>
  );
}

export default App;
