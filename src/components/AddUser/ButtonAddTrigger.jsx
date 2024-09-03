import {TiUserAdd} from 'react-icons/ti'
const ButtonAddTrigger = () =>{
    const openModal = () =>{
        return document.getElementById('add-modal').showModal()
    }
    return (
        <div className="tooltip tooltip-bottom" data-tip="Add User">
            <button className="btn btn-circle bg-red-500 btn-outline hover:bg-white hover:border-red-500 text-white" onClick={openModal}><TiUserAdd/></button>
        </div>
    )
}
export default ButtonAddTrigger