import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';

import AddTaskForm from './components/AddTaskForm';
import UpdateForm from './components/UpdateForm';
import ToDoList from './components/ToDoList';
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.status,
    Completed: task => task.status
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const App = () => {
    const [todoList, setTodoList] = useState([]);
    /*
        [
            { 'id': 1, 'title': 'Task 1', 'status': false },
            { 'id': 2, 'title': 'Task 2', 'status': true },
            { 'id': 3, 'title': 'Task 3', 'status': false }
        ]
    */
    const addItemRef = useRef();
    const editFieldRef = useRef(null);
    const [query, setQuery] = useState('');
    const [updateTaskData, setUpdateTaskData] = useState('');
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        if (updateTaskData) {
            editFieldRef.current.focus();
        }
    }, [updateTaskData]);

    const addTask = () => {
        if (addItemRef.current.value) {
            const taskId = todoList.length + 1;
            const title = addItemRef.current.value;

            setTodoList(currentList => [...currentList, { id: taskId, title, status: false }]);
            addItemRef.current.value = '';
        }
    };

    const deleteTask = (id) => {
        setTodoList(currentList => currentList.filter(task => task.id !== id));
    };

    const toggleTaskCompleted = (id) => {
        setTodoList([...todoList].map(task => task.id === id ?
            ({ ...task, status: !task.status })
            : task
        ));
    };

    const updateDataHolder = (e) => {
        setUpdateTaskData({ ...updateTaskData, title: e.target.value });
    };

    const cancelUpdate = () => {
        setUpdateTaskData('');
    };

    const updateTask = () => {
        if (updateTaskData && updateTaskData.id) {
            const filteredList = [...todoList].filter(task => task.id !== updateTaskData.id);

            setTodoList([...filteredList, updateTaskData]);
            setUpdateTaskData('');
        }
    };

    const searchedItems = useMemo(() => [...todoList].filter(item => item.title.toLowerCase().includes(query.toLocaleLowerCase())), [todoList, query]);

    return (
        <div className="app">
            <div className="main">
                <div className="page">
                    <header className="page-header">
                        <h1 className="page-title">
                            <strong>To-Do List App</strong>
                        </h1>
                    </header>

                    <div className="page-content">
                        <div className="search-filter">
                            <input placeholder="Search..." className='form-input' value={query} onChange={e => setQuery(e.target.value)} />
                        </div>

                        <br />

                        {updateTaskData.length !== 0 ? (
                            <UpdateForm
                                updateTaskData={updateTaskData}
                                updateDataHolder={updateDataHolder}
                                updateTask={updateTask}
                                cancelUpdate={cancelUpdate}
                                editFieldRef={editFieldRef}
                            />
                        ) : (
                            <AddTaskForm
                                addItemRef={addItemRef}
                                addTask={addTask}
                            />
                        )}

                        <br />

                        <div className="filters">
                            {FILTER_NAMES.map(filterName => (
                                <FilterButton
                                    key={filterName}
                                    name={filterName}
                                    isPressed={filterName === filter}
                                    setFilter={setFilter}
                                />
                            ))}
                        </div>

                        <br />

                        <div>
                            {todoList && todoList.length ? '' : 'What is on your mind?'}
                            <ToDoList
                                todoList={searchedItems}
                                toggleTaskCompleted={toggleTaskCompleted}
                                setUpdateTaskData={setUpdateTaskData}
                                deleteTask={deleteTask}
                                filter={FILTER_MAP[filter]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
