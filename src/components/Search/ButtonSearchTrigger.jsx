import {FaSearch} from 'react-icons/fa'
const ButtonSearchTrigger = () =>{
    const openModal = () =>{
        return document.getElementById('search-modal').showModal()
    }
    return (
        <div className="tooltip tooltip-bottom" data-tip="Search User">
            <button className="btn btn-circle bg-main btn-outline hover:bg-white hover:border-main text-white" onClick={openModal}><FaSearch/></button>
        </div>
    )
}
export default ButtonSearchTrigger