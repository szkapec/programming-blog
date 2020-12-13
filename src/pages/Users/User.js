import React from 'react'
import { Link } from 'react-router-dom';


const User = ({user}) => {
    return (
        <div className="topic-wrapper">
          <div className="topic-user">
            <img src={user.avatar} className="topic-avatar" alt="users avatar" />
            <p>{user.userName}</p>
          </div>
    
          <div className="topic-section">
                <Link to={`/users/user/${user._id}`}>Zobacz profil</Link>
          </div>
      </div>
    )
}

export default User

