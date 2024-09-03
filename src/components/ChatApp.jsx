import RecentChat from "./RecentChat/RecentChat"
import Navbar from "./Navbar/Navbar"
import StatusBar from "./StatusBar/StatusBar"
const ChatApp = () =>{
    return(
        <div className="flex flex-col font-suse">
            <Navbar/> 
            <StatusBar/>
            <RecentChat/>
        </div>
    )
}
export default ChatApp