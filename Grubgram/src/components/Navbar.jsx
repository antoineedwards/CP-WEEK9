import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div style={{
        display: 'flex', alignItems: 'center',
        margin: '0 20px 0 20px',
        justifyContent: 'space-between'
      }}>
        <img src='/src/assets/grubgram-logo.png' alt='Grubgram Logo' style={{ height: '40px', margin: '5px 5px 5px 5px' }} />
        <div style={{ margin: '0 0 0 1.5rem' }}>
          <Link to="/" className='nav-button' style={{ marginRight: '1rem' }}>Home</Link>
          <Link to="/create" className='nav-button'>Create Post</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
