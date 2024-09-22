import FormRegister from "../components/Register/FormRegister";

const Register = () => {
  const onRegister = ({ fullName, username, password }) => {
    console.log({ fullName, username, password });
  };
  return (
    <div className="w-3/4 md:w-1/2 flex-col mx-auto bg-slate-50 shadow-lg mt-[5rem] rounded p-5">
      <h2 className="text-2xl text-center text-main font-bold">Register</h2>
      <FormRegister register={onRegister} />
    </div>
  );
};
export default Register;
