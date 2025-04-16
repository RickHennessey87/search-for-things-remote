import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc'}}>
            <ul style={{ listStyleType: 'none', display: 'flex', gap: '20px' }}>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/blog'>Blog</Link>
                </li>
                <li>
                <Link to='/portfolio'>Portfolio</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;