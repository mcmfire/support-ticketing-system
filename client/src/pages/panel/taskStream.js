import React, { useState, useEffect } from 'react';
import Ticket from './ticket';
import CreateTicketForm from './form';
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
                                    setToggleModifyTask={setToggleModifyTask} toggleFinishedTasks={toggleFinishedTasks} 
                                    setToAuth={setToAuth}/>
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