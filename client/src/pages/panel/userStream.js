import React from "react";

const UserStream = ({users}) => {
    return (
        <>
        {users.map((user, index) => (
            <div key={`user-${index}`}>
                <h4>{user}</h4>
            </div>
        ))}
        </>
    );
};

export default UserStream;