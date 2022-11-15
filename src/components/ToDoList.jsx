import React from 'react';

const ToDoList = ({ todoList, toggleTaskCompleted, setUpdateTaskData, deleteTask, filter }) => {
    return (
        <>
            {todoList && todoList.sort((a, b) => a.id > b.id ? 1 : -1).filter(filter).map((task, index) => {
                return (
                    <React.Fragment key={task.id}>
                        <div className="task-bg">
                            <div className="details">
                                <span className="task-completed">
                                    <input
                                        id={task.id}
                                        type="checkbox"
                                        defaultChecked={task.status}
                                        onChange={() => toggleTaskCompleted(task.id)}
                                    />
                                </span>
                                <span className="task-id">{index + 1}</span>
                                <span className="task-text" title={task.title}>{task.title}</span>
                            </div>
                            <div className='actions'>
                                {task.status ? null : (
                                    <span onClick={() => setUpdateTaskData({
                                        id: task.id,
                                        title: task.title,
                                        status: !!task.status
                                    })}>Edit</span>
                                )}
                                <span onClick={() => deleteTask(task.id)}>Remove</span>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })}
        </>
    );
}

export default ToDoList;