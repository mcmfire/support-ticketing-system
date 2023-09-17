import React, { useEffect, useState } from "react";
import getImage from "../../utils/getImage";

const UserStream = ({onlineUsers}) => {
    const [avatarURLs, setAvatarURLs] = useState([]); 

    useEffect(() => {
        if (!onlineUsers) {return;}

        const fetchAvatarURLs = async () => {
            const promises = onlineUsers.map(async (onlineUser) => {
                const url = await getImage(onlineUser['user_id']);
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
            <div key={`user-${index + 1}`}>
                <img className={`user-avatar`} src={avatarURLs[index]} alt={onlineUser['username']} 
                    style={{border: '#1e1e1e 2px solid', borderRadius: '50%', height: '100px', width: '100px'}}></img>
            </div>
        ))}
        </div>
    );
};

export default UserStream;