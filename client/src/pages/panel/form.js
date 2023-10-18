import React from 'react';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import createTask from '../../services/panel/createTask';
import updateTask from '../../services/panel/updateTask';

const CreateTicketForm = ({setToggleTicket, setToAuth}) => {
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

    return (
        <form className='ticket-form' onSubmit={createTicket}>
            <Input className='title-entry' name='title-entry' type='text' placeholder='Title' required/>
            <Input className='description-entry' name='description-entry' type='text' placeholder='Description'/>
            <Input className='contact-entry' name='contact-entry' type='text' placeholder='Contact'/>
            <Button className='submit-ticket-button' type='submit' text='Create'/>
            <Button className='back-button' type='button' text='Back' onClick={() => setToggleTicket(false)}/>
        </form>
    );
};

const ModifyTaskForm = ({task, setToggleModifyTask, setToAuth}) => {
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
        <form className='task-form' onSubmit={(event) => editTask(event, task['_id'])}>
            <Input className='modify-title-entry' name='modify-title-entry' type='text'
                    placeholder='Title' required/>
            <Input className='modify-contact-entry' name='modify-contact-entry' type='text'
                    placeholder='Contact'/>
            <Button className='save-button' type='submit' text='Save'/>
            <Button className='cancel-button' type='button' text='Cancel'
                    onClick={() => setToggleModifyTask('')}/>
        </form>
    );
};

export { CreateTicketForm, ModifyTaskForm };