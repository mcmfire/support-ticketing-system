import React from "react";
import Input from '../../components/input/input'
import Button from "../../components/button/button";
import { UserOptions, TaskTools } from './options';
import updateTask from "../../services/panel/updateTask";

const Ticket = ({users, task, currentUser, toggleTaskOptions, setToggleTaskOptions, toggleModifyTask, 
                    setToggleModifyTask, toggleFinishedTasks, setToAuth}) => {
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