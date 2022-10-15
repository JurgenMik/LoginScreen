import React, {useState} from 'react';
import {useLocation} from 'react-router-dom'

function Profile() {
    const location = useLocation();

    const [userDetails, setDetails] = useState({
        username: location.state.username,
    })

    return (
        <div className="flex justify-center">
            {userDetails.username}
        </div>
    )
}

export default Profile;
