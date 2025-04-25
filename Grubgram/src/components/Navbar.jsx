import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#4c4c4c' }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        margin: '0 10px 0 10px'
      }}>
        <img src='/src/assets/grubgram-logo.png' alt='Grubgram Logo' style={{ height: '40px', marginRight: '1rem' }} />
        <div style={{ margin: '0 0 0 1.5rem' }}>
          <Link to="/" className='nav-button' style={{ marginRight: '1rem' }}>Home</Link>
          <Link to="/create" className='nav-button'>Create Post</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
