const ButtonRegister = ({ register, fullName, username, password }) => {
  return (
    <button
      className="btn bg-main text-lg text-white hover:text-main hover:bg-white btn-ghost"
      onClick={(ev) => {
        ev.preventDefault();
        register({ fullName, username, password });
      }}
    >
      Register
    </button>
  );
};

export default ButtonRegister;
