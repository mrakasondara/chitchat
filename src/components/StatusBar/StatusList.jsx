import AddStatus from "./AddStatus"
import StatusItem from "./StatusItem"

const StatusList = () =>{
    const persons = [
        {
            image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "John",
            isRead: true,
        },
        {
            image: "https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Marry",
            isRead: false,
        },
    ]
    
    return (
        <div className="flex gap-5">
            <AddStatus/>
            {persons.map(person => (
                <StatusItem {...person} key={person.name}/>
            ))}
        </div>
    )
}
export default StatusList