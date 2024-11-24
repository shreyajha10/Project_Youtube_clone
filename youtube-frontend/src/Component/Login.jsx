import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function Login({setLoginModel}) {

  const [loginField,setLoginField] = useState({"userName":"","password":""});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [navigate]);

  const handleOnChangeInput = (event,name)=>{
setLoginField({
  ...loginField,[name]:event.target.value
})
  }


  const handleLoginButton = async ()=>{
    setLoading(true)
    axios.post(`http://localhost:3000/auth/login`,loginField,{withCredentials:true}).then((res)=>{
      setLoading(false)
localStorage.setItem('token',res.data.token)
localStorage.setItem('userId',res.data.user._id)
localStorage.setItem('userProfilePic',res.data.user.profilePic)
navigate('/')

    }).catch((err) => {
      toast.error("Invalid credentials")
      console.log(err);
      setLoading(false)
    });
  }

  return (
    <>
      <div className="login">
        <div className="login_card">
          <div className="titleCard_login">Login</div>
          <div className="loginCredentials">
            <div className="userNameLogin">
              <input
                className="userNameLoginUserName"
                value={loginField.userName}
                onChange={(e)=>{handleOnChangeInput(e,"userName")}}
                type="text"
                placeholder="UserName"
              />
            </div>


          
            <div className="userNameLogin">
              <input className="userNameLoginUserName" value={loginField.password}  onChange={(e)=>{handleOnChangeInput(e,"password")}} type="password"  placeholder="Password"/>
            </div>
          </div>



<div className="login_buttons">
  <div className="login-btn" onClick={handleLoginButton}>Login</div>
  <Link to={'/signup'} className="login-btn" onClick={()=>setLoginModel()}>SignUP</Link>
  <Link to={'/'} className="login-btn" >Cancel</Link>
</div>


{ loading && <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box> }
        </div>

        <ToastContainer/>
      </div>
    </>
  );
}
export default Login;
