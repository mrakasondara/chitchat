import FormLogin from "../components/Login/FormLogin";

const Login = () => {
  const onLogin = ({ username, password }) => {
    // console.log({ username, password });
  };

  return (
    <div className="w-3/4 md:w-1/2 flex-col mx-auto bg-slate-50 shadow-lg mt-[5rem] rounded p-5">
      <h2 className="text-2xl text-center text-main font-bold">Login</h2>
      <FormLogin login={onLogin} />
    </div>
  );
};
export default Login;
