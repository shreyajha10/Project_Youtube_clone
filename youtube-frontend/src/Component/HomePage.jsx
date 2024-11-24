import { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage({ sidebar }) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/allVideo")
      .then((res) => {
        
        setData(res.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const options = [
    "All",
    "Web Development",
    "JavaScript",
    "Data Structue",
    "Server",
    "Music",
    "Computer Science",
    "Gaming",
    "Live",
    "Motivation",
    "Comedy",
    "Live",
    "Motivation",
    "Comedy",
    "Recently uploaded",
    "New to you",
  ];

  return (
    <>
      <div className={sidebar ? "homePage" : "fullHomePage"}>
        <div className="homePage_options">
          {options.map((item, index) => {
            return (
              <div key={index} className="homePage_option">
                {item}
              </div>
            );
          })}
        </div>

        <div
          className={sidebar ? "home_mainPage" : "home_mainPageWithoutSidebar"}
        >
          {data?.map((item, index) => {
            return (
              <Link to={`/watch/${item._id}`} className="youtube_video" key={item._id}>
                <div className="youtube_thumbnailBox">
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="youtube_thumbnailPic"
                  />
                </div>

                <div className="youtubeTitleBox">
                  <div className="youtubeTitleBoxProfile">
                    <img
                      src={item?.user?.profilePic}
                      alt="profile"
                      className="youtube_thumbnail_Profile"
                    />
                  </div>

                  <div className="youtubeTitleBox_Title">
                    <div className="youtube_videoTitle">{item.title}</div>
                    <p className="youtube_channelName">
                      {item?.user?.channelName}
                    </p>
                    <p className="youtubeVideo_views">
                      199K Views &bull; 2 days ago{" "}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
