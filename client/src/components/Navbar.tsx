import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks";



const NavBar = () => {
  const { isLoggedIn } = useAppSelector((state)=> state.todo)


  // useEffect(()=>{
    
  // },[])

  const setColorBasedOnlog = () => {
    return isLoggedIn ? "text-muted" : "text-secondary"
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="d-flex justify-content-around">
        <Navbar.Brand as={Link} to="/">FeedTodos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link} to="/"
              className={`${setColorBasedOnlog()} `}
            >
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/create"} className={`${setColorBasedOnlog()} `}>Create Todos</Nav.Link>
            {isLoggedIn ? <Nav.Link as={Link} to={"/logout"} className={`${setColorBasedOnlog()} `}>Logout</Nav.Link> : ""}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
