import React from 'react';
import "./styles.css";

function VideoCard(props) {
    return (
        <section className="VideoCard">
            <div className="line"></div>
            <div className="content">
                <h2>{props.lecture.title}</h2>
                <h5>{props.lecture.creator}</h5><h5>{props.lecture.date}</h5>
                <p>{props.lecture.description}</p>
            </div>
            <div className="lecture-container">
                <iframe
                    src={props.lecture.videoLink}
                    title={props.lecture.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </section>
    );
}

export default VideoCard;