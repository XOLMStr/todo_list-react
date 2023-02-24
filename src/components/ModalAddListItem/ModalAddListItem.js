import { useState, useEffect } from 'react';
import axios from 'axios';

import './modalAddListItem.scss';
import closeModalIcon from '../../assets/close_modal.svg';
import DB from '../../services/db.json';

const ModalAddListItem = ({closeModal, colors, onAddList}) => {
    const [selectColor, setSelectedColor] = useState(3); //colors[0].id
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id);
        }
    }, [colors])


    const onClose = () => {
        closeModal();
        setInputValue('');
        setSelectedColor(colors[0].id);
    }

    const addList = () => {
        if (!inputValue) {
            return (
                <div className='status'>Введите название</div>
            )
        } else if (inputValue.length > 20) {
            return (
                <div className='status'>Не больше 20 символов</div>
            )
        }

        setLoading(true);

        axios.post('http://localhost:3001/lists', {name: inputValue, colorId: selectColor}) //id - устанав. автоматич.
            .then(({data}) => {
                const color = colors.filter(color => color.id === selectColor)[0].hex;
                const listObj = {...data, color: {hex: color}}
                onAddList(listObj);
                onClose();
                setLoading(false);
            }).finally(() => {
                setLoading(false);
            })
    }

    const renderItems = (arr) => {
        const colors = arr.map(color => {
            const classNames = `modal__list-color ${selectColor === color.id ? 'active' : ''}`            
            return (
                <li key={color.id} 
                    style={{backgroundColor: `${color.hex}`}} 
                    className={classNames}
                    alt={color.name}
                    onClick={() => setSelectedColor(color.id)}
                    ></li>
            )
        })

        return (
            <ul className='modal__list'>
                {colors}
            </ul>
        )
    }

    const items = renderItems(colors); //data

    return (
        <div className='modal'>
            <img src={closeModalIcon} alt="Close modal" className='close_modal' onClick={onClose}/>
            <input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                type="text" 
                placeholder='Название папки'
                />
                {items}
            <button onClick={addList} className='modal__btn'>
                {loading ? 'Добавление...' : 'Добавить'}
            </button>
            {/* {!inputValue ? <div className='status'>Введите название</div> : null} */}
        </div>
    )
}

export default ModalAddListItem;