import Search from "../Search/Search";
import Add from "../AddUser/Add";
import { useEffect, useState } from "react";

const Navbar = () =>{
    const [isActiveHeader, setIsActiveHeader] = useState(false)

    const listenScrollEvent = () =>{
        if(window.scrollY < 70) {
            return setIsActiveHeader(false)
        }else{
            return setIsActiveHeader(true)
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll', listenScrollEvent)

        return () => window.addEventListener('scroll', listenScrollEvent)
    },[])

    return(
        <div className={`navbar sticky top-0 z-20 ${isActiveHeader ? 'shadow-lg bg-slate-100' : ''}`}>
            <div className="flex-1">
                <a href="" className="ml-5 text-4xl md:text-3xl font-bold text-main">ChitChat</a>
            </div>
            <div className="flex gap-2 px-5">
                <Search/>
                <Add/>
            </div>
        </div>
    )
}
export default Navbar