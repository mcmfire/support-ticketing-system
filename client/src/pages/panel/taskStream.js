import React, { useState, useEffect } from 'react';
import Input from '../../components/input/input'
import Button from '../../components/button/button';
import createTask from '../../services/panel/createTask';
import updateTask from '../../services/panel/updateTask';
import deleteTask from '../../services/panel/deleteTask';
import './style.css';

const TaskStream = ({tasks, users, toggleTicket, setToggleTicket, toggleFinishedTasks, setToAuth}) => {
    const [toggleModifyTask, setToggleModifyTask] = useState('');
    const [tasksByDepartment, setTasksByDepartment] = useState({});
    const currentUser = sessionStorage.getItem('username');

    useEffect(() => {
        if (!tasks) {return;}

        let updatedTasksByDepartment = {};

        tasks.forEach((task) => {
            let taskExists = false;

            if (!updatedTasksByDepartment[task['department']]) {
                updatedTasksByDepartment[task['department']] = [];
            }

            for (const department in updatedTasksByDepartment) {
                const departmentTasks = updatedTasksByDepartment[department];

                for (let index = 0; index < departmentTasks.length; index++) {
                    if (departmentTasks[index]['_id'] === task['_id']) {
                        departmentTasks[index] = task;
                        taskExists = true;
                        break;
                    }
                }
            }
            if (!taskExists) {updatedTasksByDepartment[task['department']].push(task);}  
        });
        
        for (const department in updatedTasksByDepartment) {
            updatedTasksByDepartment[department].sort((taskA, taskB) => taskB['upvotes'] - taskA['upvotes']);
        }

        setTasksByDepartment(updatedTasksByDepartment);
    }, [tasks]);

    const isFinished = (finished) => {
        return toggleFinishedTasks ? !finished : finished;
    };

    const getName = (username) => {
        const user = users.find((user) => user['username'] == username);
        const name = user['first_name'] + ' ' + user['last_name'];

        return name;
    }

    const createTicket = (event) => {
        event.preventDefault();

        const titleInput = event.target.elements['title-entry'].value;
        const descriptionInput = event.target.elements['description-entry'].value;
        const contactInput = event.target.elements['contact-entry'].value;

        createTask({
            "title": titleInput,
            "description": descriptionInput,
            "contact": contactInput,
        })
        .then(navigate => {
            setToggleTicket(false);
            setToAuth(navigate);
        });
    };

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

        updateTask({
            "_id": taskId,
            "finished": true,
        })
        .then(navigate => setToAuth(navigate));
    }

    const editTask = (event, taskId) => {
        event.preventDefault();
        
        const titleInput = event.target.elements['modify-title-entry'].value;
        const contactInput = event.target.elements['modify-contact-entry'].value;

        updateTask({
            "_id": taskId,
            "title": titleInput,
            "contact": contactInput,
        })
        .then(navigate => {
            if (!navigate) {
                setToggleModifyTask('');
            }
            setToAuth(navigate);
        });
    };

    const removeTask = (event, taskId) => {
        event.preventDefault();

        deleteTask({"_id": taskId})
        .then(navigate => setToAuth(navigate));
    };

    return (
        <div className='task-list'>
        {!toggleTicket && (
            <>
            {Object.keys(tasksByDepartment).map((department) => (
                <>
                <h1>{department}</h1>
                <hr/>
                <div className='task-container'>
                {tasksByDepartment[department].map((task, index) => (
                    <div key={`task-${index + 1}`} className='ticket-container' 
                        style={{display: isFinished(task['finished']) ? 'none' : 'block'}}>
                        {(toggleFinishedTasks ? task['finished'] : !task['finished']) && (
                            <>
                            <h2>{task['reporter']}</h2>
                            <h3>{task['position']}</h3>
                            <hr/>
                            {((!toggleModifyTask || toggleModifyTask != task['_id']) && (
                                <>
                                <p>{task['title']}</p>
                                <p>{task['contact'] ? `Contact: ${task['contact']}` : null}</p>
                                </>
                            ))}
                            {((toggleModifyTask && toggleModifyTask == task['_id']) && (
                                <form className='task-form' onSubmit={(event) => editTask(event, task['_id'])}>
                                    <Input className='modify-title-entry' name='modify-title-entry' type='text'
                                            placeholder='Title' required/>
                                    <Input className='modify-contact-entry' name='modify-contact-entry' type='text'
                                            placeholder='Contact'/>
                                    <Button className='save-button' type='submit' text='Save'/>
                                    <Button className='cancel-button' type='button' text='Cancel'
                                            onClick={() => setToggleModifyTask('')}/>
                                </form>
                            ))}
                            <p>{task['respondent'] ? `Respondent: ${getName(task['respondent'])}` : null}</p>
                            <p>Upvotes: {task['upvotes']}</p>
                            <p>{task['date_created']}</p>
                            </>
                        )}
                        {(!toggleFinishedTasks && !task['finished'] && 
                            task['username'] == currentUser && !toggleModifyTask) && (
                            <>
                            <Button className='modify-button' type='button' text='Modify' 
                                    onClick={() => setToggleModifyTask(task['_id'])}/>
                            <Button className='delete-button' type='button' text='Delete'
                                    onClick={(event) => removeTask(event, task['_id'])}/>
                            </>
                        )}
                        {(!toggleFinishedTasks && !task['finished'] && task['username'] != currentUser) && (
                            <>
                            <Button className='respond-button' type='button' text='Respond' 
                                onClick={(event) => respondTask(event, task['_id'])}
                                style={{background: task['respondent'] ? '#00cf2e': '#1e1e1e'}}/>
                            <Button className='upvote-button' type='button' text='Upvote' 
                                    onClick={(event) => upvoteTask(event, task['_id'])}/>
                            </>
                        )}
                        {(!toggleFinishedTasks && !task['finished'] && task['respondent'] && task['username'] == currentUser) && (
                            <>
                            <Button className='finish-button' type='button' text='Finish' 
                                onClick={(event) => finishTask(event, task['_id'])}
                                style={{background: task['respondent'] ? '#d10000': '#1e1e1e'}}/>
                            </>
                        )}
                    </div>
                    ))}
                </div>
                </>
            ))}
            </>
        )}
        {toggleTicket && (
            <form className='ticket-form' onSubmit={createTicket}>
                <Input className='title-entry' name='title-entry' type='text' placeholder='Title' required/>
                <Input className='description-entry' name='description-entry' type='text' placeholder='Description'/>
                <Input className='contact-entry' name='contact-entry' type='text' placeholder='Contact'/>
                <Button className='submit-ticket-button' type='submit' text='Create'/>
                <Button className='back-button' type='button' text='Back' onClick={() => setToggleTicket(false)}/>
            </form>
        )}
        </div>
    );
};

export default TaskStream;