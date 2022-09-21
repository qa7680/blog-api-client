import Navbar from 'react-bootstrap/Navbar';

const NavbarComponent = () => {
    return (
        <Navbar bg = "primary" variant = "dark">
                <Navbar.Brand className='fs-2 fw-bold' style={{marginLeft: '2rem'}} href = "/">BlogApi</Navbar.Brand>
        </Navbar>
    );
};

export default NavbarComponent;