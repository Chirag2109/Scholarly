import React from "react";
import "./styles.css";

const PersonCard = (props) => {
    return (
        <div className="person-card">
            <div className="profile-picture">
                <img src={props.person.image} alt={`${props.person.name}'s profile`} />
            </div>
            <div className="person-info">
                <h2>{props.person.name}</h2>
                <p>{props.person.title}</p>
                <button className="connect-button">Connect</button>
            </div>
        </div>
    );
};

export default PersonCard;