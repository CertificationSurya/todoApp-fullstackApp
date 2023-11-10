// import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import { useAppSelector } from "../app/hooks";



const NavBar = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user)

  const setColorBasedOnlog = () => {
    return isLoggedIn ? "text-white" : "white-60"
  }
  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
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
            <Nav.Link as={Link} to={"/create"} className={`${setColorBasedOnlog()} ${!isLoggedIn? "disable-nav" : ''}`} disabled={!isLoggedIn}>Create Todos</Nav.Link>
            {isLoggedIn ? <Nav.Link as={Link} to={"/logout"} className={`${setColorBasedOnlog()} `}>Logout</Nav.Link> : ""}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
