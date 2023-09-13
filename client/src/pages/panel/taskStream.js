import React, {useState, useEffect} from 'react';
import Input from '../../components/input/input'
import Button from '../../components/button/button';
import createTask from '../../services/panel/createTask';
import updateTask from '../../services/panel/updateTask';
import './style.css';

const TaskStream = ({tasks, toggleTicket, setToggleTicket, setToAuth}) => {
    const [tasksByDepartment, setTasksByDepartment] = useState({});
    const currentUser = sessionStorage.getItem('username');

    useEffect(() => {
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
                <p>Upvotes: {task['upvotes']}</p>
                <p>{task['date_created']}</p>
                <Button className='respond-button' type='button' text='Respond' 
                        onClick={(event) => respondTask(event, task['_id'])}
                        style={{background: task['respondent'] ? '#00cf2e': '#1e1e1e'}}/>
                <Button className='upvote-button' type='button' text='Upvote' 
                        onClick={(event) => upvoteTask(event, task['_id'])}></Button>
            </div>
            ))}
            </>
        ))}

        {toggleTicket && (
            <form className='ticket-form' onSubmit={createTicket}>
                <Input className='title-entry' name='title-entry' type='text' placeholder='Title' required/>
                <Input className='description-entry' name='description-entry' type='text' placeholder='Description'/>
                <Input className='contanct-entry' name='contact-entry' type='text' placeholder='Contact'/>
                <Button className='submit-ticket-button' type='submit' text='Create'/>
                <Button className='back-button' type='button' text='Back' onClick={() => setToggleTicket(false)}/>
            </form>
        )}
        </>
    );
};

export default TaskStream;