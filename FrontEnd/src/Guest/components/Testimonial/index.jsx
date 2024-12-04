import React from 'react';
import './style.css'; 

const testimonials = [
  {
    name: "John Doe",
    position: "CEO",
    company: "Tech Innovators",
    testimonial: "This company transformed our operations with their cutting-edge solutions. Highly recommended!",
    // photo: "path/to/photo1.jpg" 
  },
  {
    name: "Jane Smith",
    position: "Marketing Director",
    company: "Creative Solutions",
    testimonial: "Exceptional service and great results. They really understand the needs of their clients.",
    // photo: "path/to/photo2.jpg" 
  },
  
];

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2><br />
      <div className="testimonial-list">
        {testimonials.map((testi, index) => (
          <div key={index} className="testimonial-item">
            {testi.photo && <img src={testi.photo} alt={testi.name} className="testimonial-photo" />}
            <blockquote>
                {testi.testimonial}<br /><br />
                <strong>{testi.name}</strong>, {testi.position} at {testi.company}
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;