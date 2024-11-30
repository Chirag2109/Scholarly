import React from "react";
import "./styles.css";

const PersonCard = (props) => {
    return (
        <div key={index} className="person-card">
            <div className="profile-picture">
                <img src={person.image} alt={`${person.name}'s profile`} />
            </div>
            <div className="person-info">
                <h2>{person.name}</h2>
                <p>{person.title}</p>
                <button className="connect-button">Connect</button>
            </div>
        </div>
    );
};

export default PersonCard;