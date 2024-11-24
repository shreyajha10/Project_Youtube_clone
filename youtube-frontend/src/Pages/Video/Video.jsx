import "./Video.css";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

function Video() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const fetchVideoById = async () => {
    await axios
      .get(`http://localhost:3000/api/getVideoById/${id}`)
      .then((res) => {
        // console.log(res);
        setData(res.data.video);
        setVideoUrl(res?.data?.video?.videoLink);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCommentByVideoId = async () => {
    await axios
      .get(`http://localhost:3000/commentApi/comment/${id}`)
      .then((res) => {
        setComments(res?.data?.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchVideoById();
    getCommentByVideoId();
  }, [id]);

  return (
    <>
      <div className="video">
        <div className="videoPostSection">
          <div className="video_youtube">
            {data && (
              <video
                width="400"
                controls
                autoPlay
                className="video_youtube_video"
              >
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/webm" />
                Your browser does not suppor the video tag.
              </video>
            )}
          </div>

          <div className="video_youtubeAbout">
            <div className="video_utubeTitle">{data?.title}</div>
            <div className="yotube_video_ProfileBlock">
              <div className="yotube_video_ProfileBlock_left">
                <Link
                  to={`/user/${data?.user?._id}`}
                  className="yotube_video_ProfileBlock_left_img"
                >
                  <img
                    className="yotube_video_ProfileBlock_left_image"
                    src={data?.user?.profilePic}
                    alt=""
                  />
                </Link>
                <div className="youtubeVideo_subsView">
                  <div className="youtubePostProfileName">
                    {data?.user?.channelName}
                  </div>
                  <div className="youtubeProfileSubs">
                    {data?.user?.createdAt.slice(0, 10)}
                  </div>
                </div>

                <div className="subscribeBtnYoutube">Subscribe</div>
              </div>

              <div className="youtube_video_likeBlock">
                <div className="youtube_video_likeBlock_Like">
                  <ThumbUpAltOutlinedIcon />
                  <div className="youtube_video_likeBlock_NoOfLikes">
                    {data?.like}
                  </div>
                </div>
                <div className="youtubeVideoDivider"></div>

                <div className="youtube_video_likeBlock_Like">
                  <ThumbDownAltOutlinedIcon />
                </div>
              </div>
            </div>

            <div className="youtube_video_About">
              <div>{data?.createdAt.slice(0, 10)}</div>
              <div>{data?.description}</div>
            </div>

            <div className="youtubeCommentSection">
              <div className="youtubeCommentSectionTitle">
                {comments.length} Comments
              </div>
              <div className="youtubeSelfComment">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.YbK6QqL5B4a-B2hMZI4xAQHaFj&pid=Api&P=0&h=180"
                  alt=""
                  className="video_youtubeSelfCommentProfile"
                />
                <div className="addAComment">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className="addAcommentInput"
                    placeholder="Add a comment "
                  />

                  <div className="cancelSubmitComment">
                    <button className="cancelComment">Cancel</button>
                    <button className="cancelComment">Comment</button>
                  </div>
                </div>
              </div>

              <div className="outubeOthersComments">
                {comments.map((item, ind) => {
                  return (
                    <div className="youtubeSelfComment">
                      <img
                        src={item?.user?.profilePic}
                        alt=""
                        className="video_youtubeSelfCommentProfile"
                      />

                      <div className="others_commentSectionHeader">
                        <div className="channelName_comment">
                          {item?.user?.channelName}
                        </div>
                        <div className="commentTimingOthers">
                          {item?.createdAt.slice(0, 10)}
                        </div>
                      </div>

                      <div className="otherCommentSectionComment">
                        {item?.message}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="videoSuggestions">
          <div className="videoSuggestionsBlock">
            <div className="video_suggetion_thumbnail">
              <img
                src="https://www.desicomments.com/wp-content/uploads/Charming-Image-Of-Shizuka-Dc102.png"
                alt=""
                className="video_suggetion_thumbnail_img"
              />
            </div>

            <div className="video_suggetions_About">
              <div className="video_suggetions_About_title">
               Learn js
              </div>
              <div className="video_suggetions_About_Profile"> Shreya Jha</div>
              <div className="video_suggetions_About_Profile">
                {" "}
                135k views &bull; 2days ago
              </div>
            </div>
          </div>

          <div className="videoSuggestionsBlock">
            <div className="video_suggetion_thumbnail">
              <img
                src="https://www.desicomments.com/wp-content/uploads/Charming-Image-Of-Shizuka-Dc102.png"
                alt=""
                className="video_suggetion_thumbnail_img"
              />
            </div>

            <div className="video_suggetions_About">
              <div className="video_suggetions_About_title">
                Learn js
              </div>
              <div className="video_suggetions_About_Profile"> Shreya Jha</div>
              <div className="video_suggetions_About_Profile">
                {" "}
                135k views &bull; 2days ago
              </div>
            </div>
          </div>

          <div className="videoSuggestionsBlock">
            <div className="video_suggetion_thumbnail">
              <img
                src="https://www.desicomments.com/wp-content/uploads/Charming-Image-Of-Shizuka-Dc102.png"
                alt=""
                className="video_suggetion_thumbnail_img"
              />
            </div>

            <div className="video_suggetions_About">
              <div className="video_suggetions_About_title">
              Learn js
              </div>
              <div className="video_suggetions_About_Profile"> Shreya Jha</div>
              <div className="video_suggetions_About_Profile">
                {" "}
                135k views &bull; 2days ago
              </div>
            </div>
          </div>

          <div className="videoSuggestionsBlock">
            <div className="video_suggetion_thumbnail">
              <img
                src="https://www.desicomments.com/wp-content/uploads/Charming-Image-Of-Shizuka-Dc102.png"
                alt=""
                className="video_suggetion_thumbnail_img"
              />
            </div>

            <div className="video_suggetions_About">
              <div className="video_suggetions_About_title">
              Learn js
              </div>
              <div className="video_suggetions_About_Profile"> Shreya Jha</div>
              <div className="video_suggetions_About_Profile">
                {" "}
                135k views &bull; 2days ago
              </div>
            </div>
          </div>

          <div className="videoSuggestionsBlock">
            <div className="video_suggetion_thumbnail">
              <img
                src="https://www.desicomments.com/wp-content/uploads/Charming-Image-Of-Shizuka-Dc102.png"
                alt=""
                className="video_suggetion_thumbnail_img"
              />
            </div>

            <div className="video_suggetions_About">
              <div className="video_suggetions_About_title">
              Learn js
              </div>
              <div className="video_suggetions_About_Profile"> Shreya Jha</div>
              <div className="video_suggetions_About_Profile">
                {" "}
                135k views &bull; 2days ago
              </div>
            </div>
          </div>

          <div className="videoSuggestionsBlock">
            <div className="video_suggetion_thumbnail">
              <img
                src="https://www.desicomments.com/wp-content/uploads/Charming-Image-Of-Shizuka-Dc102.png"
                alt=""
                className="video_suggetion_thumbnail_img"
              />
            </div>

            <div className="video_suggetions_About">
              <div className="video_suggetions_About_title">
              Learn js
              </div>
              <div className="video_suggetions_About_Profile"> Shreya Jha</div>
              <div className="video_suggetions_About_Profile">
                {" "}
                135k views &bull; 2days ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Video;
