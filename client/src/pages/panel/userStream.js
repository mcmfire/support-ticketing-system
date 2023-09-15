import React, { useEffect, useState } from "react";
import getImage from "../../utils/getImage";

const UserStream = ({users}) => {
    const [avatarURLs, setAvatarURLs] = useState([]); 

    useEffect(() => {
        if (!users) {return;}

        const fetchAvatarURLs = async () => {
            const promises = users.map(async (user) => {
                const url = await getImage(user['user_id']);
                return url;
            });
    
            const urls = await Promise.all(promises);
    
            const filteredURLs = urls.filter(url => url);
            setAvatarURLs(filteredURLs);
        };
    
        fetchAvatarURLs();
    }, [users]);

    return (
        <>
        {users.map((user, index) => (
            <div key={`user-${index + 1}`}>
                <img className={`user-${user['user_id']}`} src={avatarURLs[index]} alt={user['name']} 
                    style={{border: '#1e1e1e 2px solid', borderRadius: '50%', height: '100px', width: '100px'}}></img>
            </div>
        ))}
        </>
    );
};

export default UserStream;