const ButtonRegister = ({ register, email, password, displayName, thumb }) => {
  return (
    <button
      className="btn bg-main text-lg text-white hover:text-main hover:bg-white btn-ghost"
      onClick={(ev) => {
        ev.preventDefault();
        register({ email, password, displayName, thumb });
      }}
    >
      Register
    </button>
  );
};

export default ButtonRegister;
