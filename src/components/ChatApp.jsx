import { Routes, Route } from "react-router"
import Navbar from "./Navbar/Navbar"
import Home from "../pages/Home"
import AddStatus from "../pages/AddStatus"
const ChatApp = () =>{
    return(
        <div className="flex flex-col font-suse">
            <Navbar/> 
            <Routes>
                <Route index path="/" element={<Home/>}></Route>
                <Route path="/addstatus" element={<AddStatus/>}></Route>
            </Routes>
        </div>
    )
}
export default ChatApp