import { Link, useNavigate } from "react-router-dom";
import "./VideoUpload.css";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";

function VideoUpload() {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    videoType: "",
  });

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleOnChangeInput = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value,
    });
  };

  const uploadImage = async (e, type) => {
    setLoader(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    data.append("upload_preset", "youtube-clone");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dkdek5w7v/${type}/upload`,
        data
      );

      const url = response.data.url;
      setLoader(false);
      const val = type === "image" ? "thumbnail" : "videoLink";
      setInputField({
        ...inputField,
        [val]: url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("userId");
    if (isLogin === null) {
      navigate("/");
    }
  }, []);

  const handleSubmitFun = async () => {
    setLoader(true);
    await axios
      .post("http://localhost:3000/api/video", inputField, {
        withCredentials: true,
      })
      .then((res) => {
        setLoader(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <>
      <div className="videoUpload">
        <div className="uploadBox">
          <div className="uploadVideoTitle">Upload Video</div>
          <div className="uploadForm">
            <input
              type="text"
              value={inputField.title}
              onChange={(e) => {
                handleOnChangeInput(e, "title");
              }}
              className="uploadFormInputs"
              placeholder="Title Of The Video"
            />
            <input
              type="text"
              value={inputField.description}
              onChange={(e) => {
                handleOnChangeInput(e, "description");
              }}
              className="uploadFormInputs"
              placeholder="Video Description"
            />
            <input
              type="text"
              value={inputField.videoType}
              onChange={(e) => {
                handleOnChangeInput(e, "videoType");
              }}
              className="uploadFormInputs"
              placeholder="Category"
            />
            <div>
              Thumbnail{" "}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => uploadImage(e, "image")}
              />
            </div>
            <div>
              Video{" "}
              <input
                type="file"
                accept="video/mp4, video/webm, video/*"
                onChange={(e) => uploadImage(e, "video")}
              />
            </div>
            {loader && (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
          </div>

          <div className="uploadBtns">
            <div className="uploadBtn-form" onClick={handleSubmitFun}>
              Upload
            </div>
            <Link to={"/"} className="uploadBtn-form">
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default VideoUpload;