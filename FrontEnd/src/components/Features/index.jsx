import React from 'react';
import './style.css';

function Features() {
    return (
        <section className="features">
          <h2>Features</h2>
          <div className="feature-item">
            <i className="fa fa-fw fa-graduation-cap feature-icon"></i>
            <h3>Feature One</h3>
            <p>Connect and build community of scholars globally</p>
          </div>
          <div className="feature-item">
            <i className="fa fa-fw fa-video-camera feature-icon"></i>
            <h3>Feature Two</h3>
            <p>Top educators live lectures and interactive sessions</p>
          </div>
          <div className="feature-item">
            <i className="fa fa-fw fa-leanpub feature-icon"></i>
            <h3>Feature Three</h3>
            <p>Access to online courses and educational resources</p>
          </div>
        </section>
    );
}

export default Features;