import React from "react";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import createTask from "../../services/panel/createTask";

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

export default CreateTicketForm;