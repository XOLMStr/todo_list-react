

import iconPlus from '../../assets/todo_plus.svg';

import './addListItemBtn.scss';


const AddListItemBtn = ({toggleModal}) => {


    return (
        <ul className='todo__add-task'>
            <li className='todo__add-task-btn' onClick={toggleModal}>
                <i>
                    <img src={iconPlus} alt="Add task" />
                </i>
                <p>Добавить папку</p>
            </li>
            
        </ul>  
    )
}

export default AddListItemBtn;