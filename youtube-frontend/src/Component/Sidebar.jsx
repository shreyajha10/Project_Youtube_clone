import "./Sidebar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import MovieIcon from "@mui/icons-material/Movie";
import SensorsIcon from "@mui/icons-material/Sensors";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Link } from "react-router-dom";
function Sidebar({ sidebar }) {
  return (
    <>
      <div className={sidebar ? "home-sideNavbar" : "homeSideNavbarHide"}>
        <div className="home_sideNavbarTop">
          <div className={`home_sideNavbarTopOption`}>
            <HomeOutlinedIcon />
            <Link to={"/"} className="home_sideNavbarTopOptionTitle">
              Home
            </Link>
          </div>

          <div className={`home_sideNavbarTopOption`}>
            <EnergySavingsLeafIcon />
            <div className="home_sideNavbarTopOptionTitle">Shorts</div>
          </div>

          <div className={`home_sideNavbarTopOption`}>
            <SubscriptionsIcon />
            <div className="home_sideNavbarTopOptionTitle">Subscriptions</div>
          </div>
        </div>

        <div className="home_sideNavbarMiddle">
          <div className={`home_sideNavbarTopOption`}>
            <div className="home_sideNavbarTopOptionTitle">You</div>

            <ChevronRightIcon />
          </div>

          <div className={`home_sideNavbarTopOption`}>
            <HistoryIcon />
            <div className="home_sideNavbarTopOptionTitle">History</div>
          </div>

          <div className={`home_sideNavbarTopOption`}>
            <PlaylistAddIcon />
            <div className="home_sideNavbarTopOptionTitle">Playlists</div>
          </div>

          <div className={`home_sideNavbarTopOption`}>
            <WatchLaterIcon />
            <div className="home_sideNavbarTopOptionTitle">Watch later</div>
          </div>

          <div className={`home_sideNavbarTopOption`}>
            <ThumbUpOffAltIcon />
            <div className="home_sideNavbarTopOptionTitle">Liked videos</div>
          </div>
        </div>

        <div className="home_sideNavbarMiddle">
          <div className="home_sideNavbarTopOption">
            <div className="home_sideNavbarTopOptionTitleHeader">Explore</div>
          </div>

          <div className={`home_sideNavbarTopOption`}>
            <WhatshotIcon />
            <div className="home_sideNavbarTopOptionTitle">Tranding</div>
          </div>

          <div className={`home_sideNavbarTopOption`}>
            <LocalMallIcon />
            <div className="home_sideNavbarTopOptionTitle">Shopping</div>
          </div>

          <div className={`home_sideNavbarTopOption`}>
            <AudiotrackIcon />
            <div className="home_sideNavbarTopOptionTitle">Music</div>
          </div>

          <div className={`home_sideNavbarTopOption`}>
            <MovieIcon />
            <div className="home_sideNavbarTopOptionTitle">Movies</div>
          </div>

          <div className={`home_sideNavbarTopOption`}>
            <SensorsIcon />
            <div className="home_sideNavbarTopOptionTitle">Live</div>
          </div>

          <div className={`home_sideNavbarTopOption`}>
            <SportsEsportsIcon />
            <div className="home_sideNavbarTopOptionTitle">Gaming</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
