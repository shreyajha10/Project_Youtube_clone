import { Link, useParams } from "react-router-dom";
import Sidebar from "../../Component/Sidebar";
import "./Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile({ sidebar }) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const fetchProfileData = async () => {
    axios
      .get(`http://localhost:3000/api/${id}/channel`)
      .then((res) => {
        setData(res.data.video);
        setUser(res.data.video[0]?.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchProfileData();
  }, []);
  return (
    <>
      <div className="profile">
        <Sidebar sidebar={sidebar} />

        <div className={sidebar ? "profile_page" : "profile_page_inactive"}>
          <div className="profile_top_section">
            <div className="profile_top_section_profile">
              <img
                src={user?.profilePic}
                alt=""
                className="profile_top_section_img"
              />
            </div>

            <div className="profile_top_section_About">
              <div className="profile_top_section_About_Name">
                {user?.channelName}
              </div>
              <div className="profile_top_section_info">
                {user?.userName} &bull; {data?.length} videos
              </div>
              <div className="profile_top_section_info"> {user?.about}</div>
            </div>
          </div>

          <div className="profile_videos">
            <div className="profile_videos_title">Videos</div>
            <div className="profileVideos">
              {data.map((item, key) => {
                return (
                  <Link
                    to={`/watch/${item._id}`}
                    className="profileVideo_block"
                  >
                    <div className="profileVideo_block_thumbnail">
                      <img
                        src={item?.thumbnail}
                        alt=""
                        className="profileVideo_block_thumbnail_img"
                      />
                    </div>

                    <div className="profileVideo_block_detail">
                      <div className="profileVideo_block_detail_name">
                        {item?.title}
                      </div>
                      <div className="profileVideo_block_detail_about">
                        {" "}
                        155k views &bull; Created at{" "}
                        {item?.createdAt.slice(0, 10)}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
