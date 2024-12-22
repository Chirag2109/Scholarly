import React from 'react';
import "./styles.css";

function NewsCard(props) {
    return (
        <section className="NewsCard">
            <div className="line"></div>
            <div className="content">
                <h2>{props.section.headline}</h2>
                <h5>{props.section.source}</h5><h5>{props.section.date}</h5>
                <p>{props.section.summary}</p>
                <a href={props.section.link} target="_blank" rel="noopener noreferrer">Read Full Update</a>
            </div>
            {props.section.image && (
                <div className="image">
                    <img src={props.section.image} alt={props.section.headline} />
                </div>
            )}
        </section>
    );
}

export default NewsCard;