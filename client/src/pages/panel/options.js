import React from 'react';
import Button from '../../components/button/button';
import updateTask from '../../services/panel/updateTask';
import deleteTask from '../../services/panel/deleteTask';

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

const TaskTools = ({task, currentUser, toggleTaskOptions, setToggleTaskOptions, toggleFinishedTasks, setToAuth}) => {
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

    const finishTask = (event, taskId) => {
        event.preventDefault();

        const confirm = window.confirm('Finish task?');

        if (confirm) {
            updateTask({
                "_id": taskId,
                "finished": true,
            })
            .then(navigate => setToAuth(navigate));
        }
    };

    return (
        <div className='task-tools'>
            {(!toggleFinishedTasks && !task['finished'] && task['username'] != currentUser) && (
                <i className='material-icons' style={{cursor: 'pointer', color: task['respondent'] ? '#00cf2e': '#1e1e1e'}}
                    onClick={(event) => respondTask(event, task['_id'])}>play_circle_filled</i>
            )}
            {(!toggleFinishedTasks && !task['finished'] && task['respondent'] && task['username'] == currentUser) && (
                <i className='material-icons' style={{cursor: 'pointer', color: '#00cf2e'}}
                    onClick={(event) => finishTask(event, task['_id'])}>check_circle</i>
            )}
            {!toggleFinishedTasks && (
                <i className='material-icons' style={{cursor: 'pointer'}}
                    onClick={(event) => upvoteTask(event, task['_id'])}>present_to_all</i>
            )}
            {(!task['finished'] && task['username'] == currentUser) && (
            <i className='material-icons task-options-button' 
            onClick={() => {
                toggleTaskOptions ? setToggleTaskOptions('') : setToggleTaskOptions(task['_id']);
                }}>more_vert</i>
        )}
        </div>
    );
};

export { UserOptions, TaskTools };