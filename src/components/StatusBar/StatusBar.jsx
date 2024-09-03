import StatusList from "./StatusList"

const RecentBar = () =>{
    
    return (
        <div className="flex flex-col py-5 px-[2rem] gap-2">
            <h4 className="text-black tracking-widest">STATUS</h4>
            <StatusList/>
        </div>
    )
}
export default RecentBar