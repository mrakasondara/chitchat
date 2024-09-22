const ButtonLogin = ({ login, username, password }) => {
  return (
    <button
      className="btn bg-main text-lg text-white hover:text-main hover:bg-white btn-ghost"
      onClick={(ev) => {
        ev.preventDefault();
        login({ username, password });
      }}
    >
      Login
    </button>
  );
};
export default ButtonLogin;
