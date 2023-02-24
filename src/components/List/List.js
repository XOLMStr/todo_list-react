import { useState } from 'react';
import axios from 'axios';

import iconMenu from '../../assets/todo_menu.svg';
import iconClose from '../../assets/todo_close.svg';
import AddListItemBtn from '../AddListItemBtn/AddListItemBtn'; 
import ModalAddListItem from '../ModalAddListItem/ModalAddListItem';

import './list.scss';

const List = ({lists, colors, onAddList, onRemove}) => {
    const [selectedItem, setSelectedItem] = useState(null); //colors[0].id
    const [visibleModal, setVisibleModal] = useState(false);
    const [selectedColor, setSelectedColor] = useState(); //hex

    const toggleModal = () => {
        setVisibleModal(() => !visibleModal);
    }

    const closeModal = () => {
        setVisibleModal(false);
    }

    const onRemoveList = (elem) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + elem.id).then(() => {
                onRemove(elem.id);
            })  
        }
    }

    const renderItems = (arr) => {
        const items = arr.map(item => {
            const classNames = `todo__list-item ${selectedItem === item.id ? 'active' : ''}`

            return (
                <li 
                    className={classNames}
                    key={item.id}
                    style={{marginTop: 3}}
                    onClick={() => setSelectedItem(item.id)}
                    >
                    <div className='todo__list-item-wrap'>
                        <span style={{background: `${item.color}`}}></span>
                        <p>{item.name}</p>
                    </div>
                    <i>
                        <img src={iconClose} alt="Delete task" onClick={() => onRemoveList(item)}/>
                    </i>
                </li>
            )
        })

        return (
            <ul className='todo__list'>
                {items}
            </ul>
        )
    }

    const items = renderItems(lists);

    return (
        <div className="todo__sidebar">
            <ul className='todo__menu'>
                <li className="todo__list-item-all "> 
                    <i>
                        <img src={iconMenu} alt="Menu icon" />
                    </i>
                    <p>Все задачи</p>
                </li>
            </ul>
            
            {items}
            <AddListItemBtn toggleModal={(toggleModal)}/>
            {visibleModal && <ModalAddListItem colors={colors} closeModal={closeModal} onAddList={onAddList}/>}
        </div>
    )
}

export default List;