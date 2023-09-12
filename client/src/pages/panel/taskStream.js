import React, {useState, useEffect} from 'react';
import Input from '../../components/input/input'
import Button from '../../components/button/button';
import createTask from '../../services/panel/createTask';
import './style.css';

const TaskStream = ({tasks, toggleTicket, setToggleTicket, setToAuth}) => {
    const [tasksByDepartment, setTasksByDepartment] = useState({});
    
    useEffect(() => {
        let updatedTasksByDepartment = {};

        tasks.forEach((task) => {
            if (!updatedTasksByDepartment[task['department']]) {
                updatedTasksByDepartment[task['department']] = [];
            }
            updatedTasksByDepartment[task['department']].push(task);

            setTasksByDepartment(updatedTasksByDepartment);
        })

    }, [tasks]);

    const createTicket = (event) => {
        event.preventDefault();

        const contactInput = event.target.elements['contact-entry'].value;
        const titleInput = event.target.elements['title-entry'].value;
        const descriptionInput = event.target.elements['description-entry'].value;

        createTask({
            "contact": contactInput,
            "title": titleInput,
            "description": descriptionInput,
        })
        .then(navigate => {
            setToAuth(navigate);
        });
    };

    return (
        <>
        {Object.keys(tasksByDepartment).map((department) => (
            <>
            <h1>{department}</h1>
            <hr/>
            {tasksByDepartment[department].map((task, index) => (
                <div key={`task-${index + 1}`} className='ticket-container'>
                <h2>{task['reporter']}</h2>
                <h3>{task['position']}</h3>
                <hr/>
                <p>{task['title']}</p>
                <p>Contact: {task['contact']}</p>
            </div>
            ))}
            </>
        ))}

        {toggleTicket && (
            <form className='ticket-form' onSubmit={createTicket}>
                <Input className='contanct-entry' name='contact-entry' type='text' placeholder='Contact' required/>
                <Input className='title-entry' name='title-entry' type='text' placeholder='Title' required/>
                <Input className='description-entry' name='description-entry' type='text' placeholder='Description'/>
                <Button className='submit-ticket-button' type='submit' text='Create'/>
                <Button className='back-button' type='button' text='Back' onClick={() => setToggleTicket(false)}/>
            </form>
        )}
        </>
    );
};

export default TaskStream;