import { Link } from 'react-router-dom'

let Navbar = () => {
    return (
      <nav className="navbar">
        <h1>Meditation Tracker</h1>
        <div className="links">
          <a href="https://joshhaver.com">Home</a>
          <Link to="/meditation/sessions">All Sessions</Link>
          <Link to="/meditation/create" style={{ 
            color: 'white', 
            backgroundColor: '#5983ff',
            borderRadius: '8px' 
          }}>New Session</Link>
        </div>
      </nav>
    );
  }
   
  export default Navbar;