import Sidebar from "../../Component/Sidebar";
import HomePage from "../../Component/HomePage";
import './Home.css'

function Home({sidebar}){
              return (
                            <>
                       <div className="home">
                            <Sidebar sidebar={sidebar}/>
                            <HomePage sidebar={sidebar}/>
                            </div>     
                            </>
              )
}
export default Home;