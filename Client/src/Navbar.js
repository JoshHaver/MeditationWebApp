import { Link } from 'react-router-dom'

let Navbar = () => {
    return (
      <nav className="navbar">
        <h1>Meditation Tracker</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/sessions">All Sessions</Link>
          <Link to="/create" style={{ 
            color: 'white', 
            backgroundColor: '#f1356d',
            borderRadius: '8px' 
          }}>New Session</Link>
        </div>
      </nav>
    );
  }
   
  export default Navbar;