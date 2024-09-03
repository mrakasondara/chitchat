import { IoIosAdd } from "react-icons/io";
const AddStatus = () =>{
    return (
        <div className="avatar flex flex-col block w-20 justify-center items-center">
            <div className="w-20 rounded-full border-2 text-center border-main border-dashed cursor-pointer">
                <p className="text-main text-5xl mt-[.8rem] ml-[.8rem]"><IoIosAdd/></p>
            </div>
            <h5 className="text-main font-semibold">Add Status</h5>
        </div>
    )
}
export default AddStatus