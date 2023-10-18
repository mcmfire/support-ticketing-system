import React from 'react';
import { UserOptions, TaskTools } from './options';
import { ModifyTaskForm } from './form';

const Ticket = ({users, task, currentUser, toggleTaskOptions, setToggleTaskOptions, toggleModifyTask, 
                    setToggleModifyTask, toggleFinishedTasks, setToAuth}) => {

    return (
        <>
        <div className='task-header'>
            <h3>{task['reporter']}</h3>
            <TaskTools task={task} currentUser={currentUser} toggleTaskOptions={toggleTaskOptions} 
                        setToggleTaskOptions={setToggleTaskOptions} toggleFinishedTasks={toggleFinishedTasks} setToAuth={setToAuth}/>
        </div>
        <div className='subinfo'>
            <h4>{task['position']}</h4>
            {!toggleFinishedTasks && (
                <p style={{fontSize: 'smaller', marginRight: task['username'] === currentUser ? '7%' : '2%'}}>{task['upvotes']}</p>
            )}
        </div>
        <hr/>
        {((!toggleModifyTask || toggleModifyTask != task['_id']) && (
            <p><strong>{task['title']}</strong></p>
        ))}
        {((toggleModifyTask && toggleModifyTask == task['_id']) && (
            <ModifyTaskForm task={task} setToggleModifyTask={setToggleModifyTask} setToAuth={setToAuth}/>
        ))}
        <p>{task['respondent'] ? `Respondent: ${users.find(user => user['username'] === task['respondent'])['name']}` : 'Respondent: N/A'}</p>
        {(!toggleFinishedTasks && !task['finished'] && 
                task['username'] == currentUser && toggleModifyTask != task['_id']
                && toggleTaskOptions == task['_id']) && (
                <UserOptions task={task} setToggleModifyTask={setToggleModifyTask} setToAuth={setToAuth}/>
        )}
        <div className='task-footer'>
            <p><strong>Contact:</strong> {task['contact'] ? task['contact'] : 'N/A'}</p>
            <p>{task['date_created']}</p>
        </div>
        </>
    );
};

export default Ticket;