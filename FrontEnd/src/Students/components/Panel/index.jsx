import { Link, useLocation } from 'react-router-dom';
import logo from "../../Images/Logo3.png";
import "./style.css";

function Panel() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="panel">
      <img src={logo} alt="logo" className="logo" />
      <div className="intro-text">
        <div className="head">Welcome to Your Academic Community</div>
        <div className="slogan">"Building Bridges, Creating Connections"</div>
        <Link to="/sign_up" className="cta-link"><button className="cta-button">Get Started</button></Link>
      </div>
    </div>
  );
}

export default Panel;