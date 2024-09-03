const StatusItem = ({image, name, isRead}) => {
    return (
        <div className="avatar flex flex-col block w-20 items-center">
            <div className={`w-20 rounded-full ${isRead ? 'border-main border-2' :'border-slate-300 border-2'}`}>
                <img src={image} />
            </div>
            <h5 className="text-main font-semibold">{name}</h5>
        </div>
    )
}
export default StatusItem