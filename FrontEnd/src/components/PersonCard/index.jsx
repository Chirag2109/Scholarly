import React from "react";
import "./styles.css";

const PersonCard = ({ users }) => {
    const usersList = Array.isArray(users) ? users : [];
    return (
        users.map((user) => {
            return (
                <div className="person-card">
                    <div className="profile-picture">
                        <img src={''} alt={`${user.username}'s profile`} />
                    </div>
                    <div className="person-info">
                        <h2>{user.username}</h2>
                        <button className="connect-button">Learn</button>
                    </div>
                </div>
            );
        })
    );
};

export default PersonCard;