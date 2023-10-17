import React, { useState, useEffect } from 'react';
import Button from '../../components/button/button';
import { UserOptions, RespondentOptions } from './options';
import Ticket from './ticket';
import CreateTicketForm from './form';
import updateTask from '../../services/panel/updateTask';
import './style.css';

const TaskStream = ({tasks, users, toggleTicket, setToggleTicket, toggleFinishedTasks, setToAuth}) => {
    const [toggleTaskOptions, setToggleTaskOptions] = useState('');
    const [toggleModifyTask, setToggleModifyTask] = useState('');
    const [tasksByDepartment, setTasksByDepartment] = useState({});
    const [departmentHasUnfinished, setDepartmentHasUnfinished] = useState({});
    const [departmentHasFinished, setDepartmentHasFinished] = useState({});
    const currentUser = sessionStorage.getItem('username');

    useEffect(() => {
        if (!tasks) {return;}

        let updatedTasksByDepartment = {};
        let updatedDepartmentHasUnfinished = {};
        let updatedDepartmentHasFinished = {};

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
            updatedDepartmentHasUnfinished[department] = updatedTasksByDepartment[department].some(task => task['finished'] === false);
            updatedDepartmentHasFinished[department] = updatedTasksByDepartment[department].some(task => task['finished'] === true);
        }
        
        setTasksByDepartment(updatedTasksByDepartment);
        setDepartmentHasUnfinished(updatedDepartmentHasUnfinished);
        setDepartmentHasFinished(updatedDepartmentHasFinished);
    }, [tasks]);

    const isFinished = (finished) => {
        return toggleFinishedTasks ? !finished : finished;
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
        <div className='task-list'>
        {!toggleTicket && (
            <>
            <h1>{toggleFinishedTasks ? 'Finished Tasks' : 'Tasks'}</h1>
            {Object.keys(tasksByDepartment).map((department) => (
                <>
                {(!toggleFinishedTasks && departmentHasUnfinished[department]) && (
                    <>
                    <h2>{department}</h2>
                    <hr/>
                    </>
                )}
                {(toggleFinishedTasks && departmentHasFinished[department]) && (
                    <>
                    <h2>{department}</h2>
                    <hr/>
                    </>
                )}
                <div className='task-container'>
                {tasksByDepartment[department].map((task, index) => (
                    <div key={`task-${index + 1}`} className='ticket-container' 
                        style={{display: isFinished(task['finished']) ? 'none' : 'block'}}>
                        {(toggleFinishedTasks ? task['finished'] : !task['finished']) && (
                            <Ticket users={users} task={task} currentUser={currentUser} toggleTaskOptions={toggleTaskOptions} 
                                    setToggleTaskOptions={setToggleTaskOptions} toggleModifyTask={toggleModifyTask} 
                                    setToggleModifyTask={setToggleModifyTask} setToAuth={setToAuth}/>
                        )}
                        {(!toggleFinishedTasks && !task['finished'] && 
                            task['username'] == currentUser && toggleModifyTask != task['_id']
                            && toggleTaskOptions == task['_id']) && (
                            <UserOptions task={task} setToggleModifyTask={setToggleModifyTask} setToAuth={setToAuth}/>
                        )}
                        {(!toggleFinishedTasks && !task['finished'] && task['username'] != currentUser) && (
                            <RespondentOptions task={task} currentUser={currentUser} setToAuth={setToAuth}/>
                        )}
                        {(!toggleFinishedTasks && !task['finished'] && task['respondent'] && task['username'] == currentUser) && (
                            <>
                            <Button className='finish-button' type='button' text='Finish' 
                                onClick={(event) => finishTask(event, task['_id'])}/>
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
            <CreateTicketForm setToggleTicket={setToggleTicket} setToAuth={setToAuth}/>
        )}
        </div>
    );
};

export default TaskStream;