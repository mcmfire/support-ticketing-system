import React, { useEffect, useState } from "react";
import { getImage } from "../../utils/getImage";

const UserStream = ({onlineUsers, setProfileAvatar}) => {
    const [avatarURLs, setAvatarURLs] = useState([]); 
    const currentUser = sessionStorage.getItem('username');

    useEffect(() => {
        if (!onlineUsers) {return;}

        const fetchAvatarURLs = async () => {
            const promises = onlineUsers.map(async (onlineUser) => {
                const url = await getImage(onlineUser['user_id']);

                if (onlineUser['username'] == currentUser) {
                    setProfileAvatar(url);
                }

                return url;
            });
    
            const urls = await Promise.all(promises);
    
            const filteredURLs = urls.filter(url => url);
            setAvatarURLs(filteredURLs);
        };
    
        fetchAvatarURLs();
    }, [onlineUsers]);

    return (
        <div className="user-container">
        {onlineUsers.map((onlineUser, index) => (
            <div key={`user-${index + 1}`} style={{marginRight: '2%'}}>
                <img className={`user-avatar`} src={avatarURLs[index]} alt={onlineUser['username']} 
                    title={currentUser == onlineUser['username'] ? 'You' : onlineUser['name']}
                    style={{border: '#1e1e1e 2px solid', borderRadius: '50%', height: '4em', width: '4em'}}/>
            </div>
        ))}
        </div>
    );
};

export default UserStream;