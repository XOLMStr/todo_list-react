
import iconEdit from '../../assets/todo_edit.svg';
import iconClose from '../../assets/todo_close.svg';
import iconCheck from '../../assets/todo_check.svg';
import './tasks.scss';

const Tasks = ({list}) => {
    console.log(list);

    const renderTasks = (arr) => {
        const tasks = arr.map(task => (
            <li className="todo__task-item" key={task.id}>
                <div className="checkbox">
                    <input type="checkbox" id={`task-${task.id}`} />
                    <label htmlFor={`task-${task.id}`}>
                        <img className='checkbox_mark' src={iconCheck} alt="Check task" />
                    </label>
                </div>
                <input type="text" value={task.text} />
                <img className='todo__task-item-remove' src={iconClose} alt="Remove task" />
            </li>
        ))
        return (
            <ul className="todo__tasks">
                {tasks}
            </ul>
        )
    }

    const tasks = renderTasks(list.tasks);

    return (
        <div className="todo__content">
            <div className='todo__tasks_wrap'>
                <h2>{list.name}</h2>
                <img className='todo__task-edit' src={iconEdit} alt="Edit list name" />
            </div>
            <div className="todo__line"></div>
            {tasks}
        </div>
    )
}

export default Tasks;