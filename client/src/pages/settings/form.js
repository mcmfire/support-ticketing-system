import React from "react";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import authenticateUser from "../../services/auth/authenticateUser";
import updateUser from "../../services/settings/updateUser";
import authReset from "../../utils/authReset";

const ModifyAccountForm = ({accountInfo, setToggleModifyUser, setToAuth}) => {
    const modifyUser = (event) => {
        event.preventDefault();

        const fnameInput = event.target.elements['fname-modify-entry'].value;
        const lnameInput = event.target.elements['lname-modify-entry'].value;
        const emailInput = event.target.elements['email-modify-entry'].value;
        const departmentInput = event.target.elements['department-modify-entry'].value;
        const positionInput = event.target.elements['position-modify-entry'].value;
        const passwordInput = event.target.elements['password-modify-entry'].value;

        authenticateUser(passwordInput)
        .then(authenticated => {
            if (authenticated) {
                updateUser({
                    "first_name": fnameInput,
                    "last_name": lnameInput,
                    "email": emailInput,
                    "department": departmentInput,
                    "position": positionInput,
                })
                .then(navigate => {
                    if (navigate) {
                        authReset();
                    }
                    else {
                        setToggleModifyUser(false);
                    }
                    setToAuth(navigate);
                });
            }
            else {
                console.log('Invalid password.');
            }
        });
    };

    return (
        <form className='modify-account-form' onSubmit={modifyUser}>
            <label htmlFor='fname-modify-entry'>First Name</label>
            <Input className='fname-entry' name='fname-modify-entry' 
                    type='text' placeholder={accountInfo['first_name'] ? accountInfo['first_name'] : 'First Name'}/>
            <label htmlFor='lname-modify-entry'>Last Name</label>
            <Input className='lname-entry' name='lname-modify-entry' 
                    type='text' placeholder={accountInfo['last_name'] ? accountInfo['last_name'] : 'Last Name'}/>
            <label htmlFor='department-modify-entry'>Department</label>
            <Input className='department-entry' name='department-modify-entry'
                    type='text' placeholder={accountInfo['department'] ? accountInfo['department'] : 'Department'}/>
            <label htmlFor='position-modify-entry'>Position</label>
            <Input className='position-entry' name='position-modify-entry'
                    type='text' placeholder={accountInfo['position'] ? accountInfo['position'] : 'Position'}/>
            <label htmlFor='email-modify-entry'>Email</label>
            <Input className='email-entry' name='email-modify-entry' 
                    type='email' placeholder={accountInfo['email'] ? accountInfo['email'] : 'Email'}/>
            <label htmlFor='password-modify-entry'>Confirm Identity</label>
            <Input className='password-entry' name='password-modify-entry'
                    type='password' placeholder='Password' required/>
            <Button className='confirm-button' type='submit' text='Confirm'/>
            <Button className='back-button' type='button' text='Back' onClick={() => setToggleModifyUser(false)}/>
        </form>
    );
};

export { ModifyAccountForm };