import Search from "../Search/Search";
import Add from "../AddUser/Add";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "./Dropdown";

const Navbar = ({ onLogout }) => {
  const [isActiveHeader, setIsActiveHeader] = useState(false);

  const listenScrollEvent = () => {
    if (window.scrollY < 70) {
      return setIsActiveHeader(false);
    } else {
      return setIsActiveHeader(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.addEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <div
      className={`navbar  ${isActiveHeader ? "shadow-lg bg-slate-100" : ""}`}
    >
      <div className="flex-1">
        <Link to="/" className="ml-5 text-4xl md:text-3xl font-bold text-main">
          ChitChat
        </Link>
      </div>
      <div className="flex gap-2 px-5">
        <Search />
        <Add />
        <DropDown onLogout={onLogout} />
      </div>
    </div>
  );
};
export default Navbar;
