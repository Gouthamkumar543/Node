import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const Navigate = useNavigate()
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Foodieees</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/nonveg">NonVeg</Nav.Link>
                        <Nav.Link href="/veg">Veg</Nav.Link>
                        <Button onClick={() => Navigate("/addnewrecipie")}>addnewrecipie</Button>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar