import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

interface NavBarProps {
  isLoggedIn: boolean;
}


const NavBar = ({ isLoggedIn }: NavBarProps) => {
  const setColorBasedOnlog = () => {
    return isLoggedIn ? "text-primary" : "text-secondary"
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
