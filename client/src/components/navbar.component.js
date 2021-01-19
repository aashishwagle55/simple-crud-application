import React from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function NavBar() {
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>
            <Link to='/'><span style={{color: 'white'}}>Home Feed</span></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Item style={{paddingLeft: '30px', paddingTop: '10px', paddingBottom: '10px'}}>
                    <Link to='/create'><span style={{color: 'white'}}>Create user/post</span></Link>
                </Nav.Item>
                <Nav.Item style={{paddingLeft: '30px', paddingTop: '10px', paddingBottom: '10px'}}>
                    <Link to='/read'><span style={{color: 'white'}}>Edit/Delete Posts</span></Link>
                </Nav.Item>
                <Nav.Item style={{paddingLeft: '30px', paddingTop: '10px', paddingBottom: '10px'}}>
                    <Link to='/deleteUser'><span style={{color: 'white'}}>Delete Users</span></Link>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar