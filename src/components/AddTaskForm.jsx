const AddTaskForm = ({ addItemRef, addTask }) => {
    return (
        <div className="add-form">
            <span className="form-input-wrapper">
                <input className="form-input"
                    ref={addItemRef}
                />
            </span>
            <button className="input-button" type="button" onClick={addTask}>Add task</button>
        </div>
    );
}

export default AddTaskForm;