const ButtonLogin = ({ login, email, password }) => {
  return (
    <button
      className="btn bg-main text-lg text-white hover:text-main hover:bg-white btn-ghost"
      onClick={(ev) => {
        ev.preventDefault();
        login({ email, password });
      }}
    >
      Login
    </button>
  );
};
export default ButtonLogin;
