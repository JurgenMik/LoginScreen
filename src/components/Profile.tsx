import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const location = useLocation();

    const [userDetails, setDetails] = useState({
        username: location.state.username,
        email: '',
        registeredAt: ''
    })

    useEffect(() => {
        handleProfile();
    }, [])

    const handleProfile = () => {
       axios.post('http://localhost:3002/profile', { username: userDetails.username })
           .then(response => {
               setDetails({...userDetails,
                   email: response.data.user.email,
                   registeredAt: response.data.user.date
               });
           })
           .catch(error => {
               console.log(error);
           })
    }

    return (
        <div className="flex justify-center">
            {userDetails.username}
            {userDetails.email}
            {userDetails.registeredAt}
        </div>
    )
}

export default Profile;
