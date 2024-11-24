import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function SignUp() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    "https://tse4.mm.bing.net/th?id=OIP.o7-gzN9LRMLfi64PwA5PXAHaHa&pid=Api&P=0&h=180"
  );
  const [signUpField, setSignUpField] = useState({
    channelName: "",
    userName: "",
    password: "",
    about: "",
    profilePic: uploadedImageUrl,
  });

  const [progressBar, setProgressBar] = useState(false);
  const navigate = useNavigate();

  const handleInputField = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value,
    });
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    data.append("upload_preset", "youtube-clone");
    try {
      setProgressBar(true);

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dkdek5w7v/image/upload",
        data
      );
      setProgressBar(false);
      const imageUrl = response.data.url;
      setUploadedImageUrl(imageUrl);
      setSignUpField({
        ...signUpField,
        profilePic: imageUrl,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async () => {
    setProgressBar(true);
    axios
      .post(`http://localhost:3000/auth/signup`, signUpField)
      .then((res) => {
        toast.success(res.data.message);
        setProgressBar(false);
        navigate("/");
      })
      .catch((err) => {
        setProgressBar(false);
        toast.error(err);
      });
  };

  return (
    <>
      <div className="signUp">
        <div className="signup_card">
          <div className="signUp_title">SignUp</div>

          <div className="signUp_Inputs">
            <input
              type="text"
              className="signUp_Inputs_inp"
              value={signUpField.channelName}
              onChange={(e) => {
                handleInputField(e, "channelName");
              }}
              placeholder="ChannelName"
            />
            <input
              type="text"
              className="signUp_Inputs_inp"
              value={signUpField.userName}
              onChange={(e) => {
                handleInputField(e, "userName");
              }}
              placeholder="User Name"
            />
            <input
              type="text"
              className="signUp_Inputs_inp"
              value={signUpField.password}
              onChange={(e) => {
                handleInputField(e, "password");
              }}
              placeholder="Password"
            />
            <input
              type="text"
              className="signUp_Inputs_inp"
              value={signUpField.about}
              onChange={(e) => {
                handleInputField(e, "about");
              }}
              placeholder="About Your Channel"
            />

            <div className="image_upload_signup">
              <input type="file" onChange={(e) => uploadImage(e)} />
              <div className="image_upload_signup_div">
                <img
                  src={uploadedImageUrl}
                  alt=""
                  className="image_default_signUp"
                />
              </div>
            </div>

            <div className="signUpBtns">
              <div className="signUpBtn" onClick={handleSignup}>
                SignUp
              </div>
              <Link to={"/"} className="signUpBtn">
                HomePage
              </Link>
            </div>
            {progressBar && (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default SignUp;