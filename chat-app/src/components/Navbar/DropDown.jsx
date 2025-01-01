import { Link } from "react-router-dom";

const DropDown = ({ onLogout, thumb }) => {
  return (
    <div className="dropdown dropdown-end z-40">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar mt-1"
      >
        <div className="w-20 rounded-full">
          <img
            src={
              thumb == "none"
                ? "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                : thumb
            }
            alt="profile"
            className="scale-150"
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
