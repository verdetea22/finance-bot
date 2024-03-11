import React, { useState } from "react";
import "./common.css";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useFirebaseAuth } from "./../../hooks";
import { signOutUser } from "../../services/firebase/auth"

function Header() {

  const user = useFirebaseAuth();
 
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
      <Navbar.Brand href="/">financebot</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Account" id="navbarScrollingDropdown">
            <NavDropdown.Item onClick={() => {signOutUser()}}>Sign Out</NavDropdown.Item>
            <NavDropdown.Item href="/sign-up">Sign Up</NavDropdown.Item>
            <NavDropdown.Item href="/login">Sign In</NavDropdown.Item>
          </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>);
}

export default Header;
