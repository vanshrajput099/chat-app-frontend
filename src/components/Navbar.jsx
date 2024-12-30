import React from 'react'
import { accentColor, border, buttonTextColor, inputBG, inputText, primaryText, secBackgroundColor, secText } from '../constants'
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import { logoutUser } from '../api/user';
import { setLogout } from '../redux/features/user';
import { removeOnlineUser, setLogoutMessages } from '../redux/features/message';
import { useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { FaHome } from "react-icons/fa";

const Navbar = ({ loginPage, setLoginPage }) => {

  const store = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutFunction = async () => {
    const res = await logoutUser();
    if (res.status < 400) {
      const socket = store.socket;
      dispatch(setLogout());
      dispatch(setLogoutMessages());
    }
  }

  return (
    <div className='p-4 text-white flex justify-between' style={{ borderBottom: `1px solid ${border}`,backgroundColor:secBackgroundColor }}>
      <h1 className='text-2xl font-bold'>Chatty Application</h1>
      <div className='flex gap-2 items-center'>
        {/* <button style={{ border: `1px solid ${border}`, color: buttonTextColor, backgroundColor: accentColor }} className='px-3 py-1 rounded-lg'>Dark Theme</button> */}
        {
          store.authUser && !store.isCheckingAuth ?
            <div className='flex items-center gap-3'>
              {
                location.pathname === "/profile" ? <p onClick={() => navigate("/")} className='hover:cursor-pointer flex items-center gap-2 px-2 py-1 rounded-lg' style={{ border: `1px solid ${border}`, backgroundColor: accentColor, color: buttonTextColor }}><FaHome className='text-3xl hover:cursor-pointer' /> Home</p> : <p onClick={() => navigate("/profile")} className='hover:cursor-pointer flex items-center gap-2 px-2 py-1 rounded-lg' style={{ border: `1px solid ${border}`, backgroundColor: accentColor, color: buttonTextColor }}><CgProfile className='text-3xl hover:cursor-pointer' /> Profile</p>
              }
              <CiLogout onClick={logoutFunction} className='text-3xl hover:cursor-pointer' />
            </div>
            : null
        }
        {
          !store.authUser ?
            loginPage ?
              <button onClick={() => { navigate("/login"); setLoginPage(false); }} style={{ border: `1px solid ${border}`, color: secText, backgroundColor: inputBG }} className='px-3 py-1 rounded-lg flex gap-2 items-center'><IoIosLogIn />Login</button>
              :
              <button onClick={() => { navigate("/register"); setLoginPage(true); }} style={{ border: `1px solid ${border}`, color: buttonTextColor, backgroundColor: accentColor }} className='px-3 py-1 rounded-lg flex items-center gap-2'><MdOutlinePeopleAlt /> Sign in</button>
            : null
        }
      </div>

    </div>
  )
}

export default Navbar