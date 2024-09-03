const RecentItem = () =>{
    return (
        <div className="w-full md:w-1/2 md:mx-auto flex gap-2 md:p-2">
            <div className="avatar block w-20 items-center">
                <div className="w-20 rounded-full">
                    <img src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                </div>
            </div>
            <div className="w-full flex flex-col justify-center">
                <div className="flex">
                    <h5 className="text-main font-bold">John</h5>
                    <span className="ml-auto text-[10px]">15:30</span>
                </div>
                <p className="text-black text-[12px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur, illum.</p>
            </div>
        </div>
    )
}
export default RecentItem