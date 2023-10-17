import React from "react";
import Input from '../../components/input/input'
import Button from "../../components/button/button";
import updateTask from "../../services/panel/updateTask";

const Ticket = ({users, task, currentUser, toggleTaskOptions, setToggleTaskOptions, toggleModifyTask, 
                    setToggleModifyTask, setToAuth}) => {
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
            {(!task['finished'] && task['username'] == currentUser) && (
                <span className='material-icons task-options-button' 
                onClick={() => {
                    toggleTaskOptions ? setToggleTaskOptions('') : setToggleTaskOptions(task['_id']);
                    }}>more_vert</span>
            )}
        </div>
        <h4>{task['position']}</h4>
        <hr/>
        {((!toggleModifyTask || toggleModifyTask != task['_id']) && (
            <>
            <p>{task['title']}</p>
            <p>{task['contact'] ? `Contact: ${task['contact']}` : 'Contact: N/A'}</p>
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
        <p>{task['respondent'] ? `Respondent: ${users.find(user => user['username'] === task['respondent'])['name']}` : 'Respondent: N/A'}</p>
        <p>Upvotes: {task['upvotes']}</p>
        <p>{task['date_created']}</p>
        </>
    );
};

export default Ticket;