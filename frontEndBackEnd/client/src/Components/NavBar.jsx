import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Foodieees</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/nonveg">NonVeg</Nav.Link>
                        <Nav.Link href="/veg">Veg</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar