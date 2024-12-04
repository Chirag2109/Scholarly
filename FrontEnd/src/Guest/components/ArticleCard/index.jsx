import React from 'react';
import "./styles.css";

function ArticleCard(props) {
    return (
        <section className="Card">
            <div className="line"></div>
            <div className="content">
                <h2>{props.article.topic}</h2>
                <h5>{props.article.author}</h5><h5>{props.article.date}</h5>
                <p>{props.article.description}</p>
                <a href={props.article.link} target="_blank" rel="noopener noreferrer">Read More...</a>
            </div>
            <div className="image">
                <img src={props.article.image} alt={props.article.topic} />
            </div>
        </section>
    );
}

export default ArticleCard;