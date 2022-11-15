const UpdateForm = ({ updateTaskData, updateDataHolder, updateTask, cancelUpdate, editFieldRef }) => {
    return (
        <div className="update-form">
            <div>
                <input
                    ref={editFieldRef}
                    className="form-input"
                    value={updateTaskData && updateTaskData.title}
                    onChange={e => updateDataHolder(e)}
                />
            </div>
            <div>
                <button className="input-button" type="button" onClick={updateTask}>Update</button>
            </div>
            <div>
                <button className="input-button" type="button" onClick={cancelUpdate}>Cancel</button>
            </div>
        </div>
    );
}

export default UpdateForm;