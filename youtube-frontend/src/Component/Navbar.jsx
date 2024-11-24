

import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardVoiceRoundedIcon from "@mui/icons-material/KeyboardVoiceRounded";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Login from "./Login";
import axios from "axios";
function Navbar({setSideNavbar,sidebar}) {
  
  const [userPic, setUserPic] = useState("https://static.vecteezy.com/system/resources/previews/020/765/399/large_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg");
  const[navbarModel, setNavbarModel] = useState(false);
  const [login,setLogin] = useState(false);
  const navigate= useNavigate();
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  function handleClickModel() {
    setNavbarModel(prev => !prev)
  }

const sidebarFun=()=>{
setSideNavbar(!sidebar)
}
const handleprofile=()=>{
  const userId = localStorage.getItem("userId")
navigate(`/user/${userId}`);
setNavbarModel(false);
}
const setLoginModel=(value)=>{
  setLogin(value);
}

const onclickOfPopUpOption =(button)=>{
  setNavbarModel(false);
    if(button === "login"){
setLogin(true);
  }
  else{
localStorage.clear();
getLogoutBtn();
setTimeout(()=>{
  navigate('/')
  window.location.reload();
},2000);
  }
}

const getLogoutBtn= async ()=>{
  axios.post(`http://localhost:3000/auth/logout`,{},{withCredentials:true}).then((res) =>{
    console.log()
  }).catch(err=>{
    console.log(err)
  })
}

useEffect(()=>{
const userProfilePic = localStorage.getItem("userProfilePic");
  setIsLoggedIn(localStorage.getItem("userId")!==null ?true:false)
  if(userProfilePic!==null){
    setUserPic(userProfilePic);
  }

},[])
  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <div onClick={sidebarFun} className="navbarHamberger">
            <MenuIcon />
          </div>
          <Link to={'/'} className="navbar_youtubeimg">
            <YouTubeIcon
              sx={{ fontSize: "34px" }}
              className="navbar_youtubeImage"
            />
            <div className="navbar_youtubeTitle">YouTube</div>
          </Link>
        </div>

        <div className="navbar-middle">
          <div className="navbar_searchBox">
            <input
              type="text"
              placeholder="Search"
              className="navbar_searchBoxInput"
            />
            <div className="navbar_searchIconBox">
              <SearchOutlinedIcon sx={{ fontSize: "28px" }} />
            </div>
          </div>
          <div className="navbar_mike">
            <KeyboardVoiceRoundedIcon />
          </div>
        </div>

        <div className="navbar-right">
         <Link to={'/123/upload'} className="video_icon"> <VideoCallOutlinedIcon sx={{fontSize:"30px"}}/> </Link>
          <NotificationsNoneRoundedIcon sx={{fontSize:"30px"}}/>
          <img onClick={handleClickModel} src={userPic} alt="logo" className="navbar-right-logo" />


{navbarModel  && 
          <div className="navbar-model">
           {isLoggedIn &&  <div className="navbar-model-option" onClick={handleprofile}>Profile</div>}
           {isLoggedIn && <div className="navbar-model-option" onClick={()=>onclickOfPopUpOption("logout")}>Logout</div> }
           {!isLoggedIn && <Link to={'/login'} className="navbar-model-option" onClick={()=>onclickOfPopUpOption("login")}>Login</Link>}
          </div>


}

        </div>
        {
          login && <Login setLoginModel={setLoginModel}/>
        }
      </div>
    </>
  );
}
export default Navbar;
