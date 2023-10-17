import React from "react";
import Button from "../../components/button/button";
import updateTask from "../../services/panel/updateTask";
import deleteTask from "../../services/panel/deleteTask";

const UserOptions = ({task, setToggleModifyTask, setToAuth}) => {
    const removeTask = (event, taskId) => {
        event.preventDefault();

        const confirm = window.confirm('Delete task?');

        if (confirm) {
            deleteTask({"_id": taskId})
            .then(navigate => setToAuth(navigate));
        }
    };

    return (
        <div className='task-options'>
            <Button className='modify-button' type='button' text='Modify' 
                    onClick={() => setToggleModifyTask(task['_id'])}/>
            <Button className='delete-button' type='button' text='Delete'
                    onClick={(event) => removeTask(event, task['_id'])}/>
        </div>
    );
};

const RespondentOptions = ({task, currentUser, setToAuth}) => {
    const respondTask = (event, taskId) => {
        event.preventDefault();

        updateTask({
            "_id": taskId,
            "respondent": currentUser,
        })
        .then(navigate => {
            setToAuth(navigate);
        });
    };

    const upvoteTask = (event, taskId) => {
        event.preventDefault();

        updateTask({
            "_id": taskId,
            "upvote": currentUser,
        })
        .then(navigate => setToAuth(navigate));
    };

    return (
        <>
        <Button className='respond-button' type='button' text='Respond' 
            onClick={(event) => respondTask(event, task['_id'])}
            style={{background: task['respondent'] ? '#00cf2e': '#1e1e1e'}}/>
        <Button className='upvote-button' type='button' text='Upvote' 
            onClick={(event) => upvoteTask(event, task['_id'])}/>
        </>
    );
};

export { UserOptions, RespondentOptions };