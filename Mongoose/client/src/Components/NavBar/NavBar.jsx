import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavBar = () => {
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">JobPortal</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/signup">SignUp</Nav.Link>
                        <Nav.Link href="/login">LogIn</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar