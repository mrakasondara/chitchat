import FormRegister from "../components/Register/FormRegister";
import { createUser } from "../firebase/user/user";
import { addUserToDatabase } from "../firebase/user/user";

const Register = () => {
  const onRegister = async ({ email, password, displayName }) => {
    const response = await createUser({ email, password, displayName });
    if (response.email) {
      await addUserToDatabase({ email, displayName, id: response.uid });
    }
  };
  return (
    <div className="w-3/4 md:w-1/2 flex-col mx-auto bg-slate-50 shadow-lg mt-[5rem] rounded p-5">
      <h2 className="text-2xl text-center text-main font-bold">Register</h2>
      <FormRegister register={onRegister} />
    </div>
  );
};
export default Register;
