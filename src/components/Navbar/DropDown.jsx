import { Link } from "react-router-dom";

const DropDown = ({ onLogout }) => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar mt-1"
      >
        <div className="w-20 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            className="scale-150"
            src="profile.jpg"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-main text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li>
          <button onClick={() => onLogout()}>Logout</button>
        </li>
      </ul>
    </div>
  );
};
export default DropDown;
