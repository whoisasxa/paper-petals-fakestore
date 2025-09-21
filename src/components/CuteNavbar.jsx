import { Navbar, Container, Nav, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function CuteNavbar() {
    return (
        <Navbar expand="md" bg="light" className="border-bottom" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    ✿ Paper Petals <Badge className="ms-2 badge-soft">beta</Badge>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="cute-nav" />
                <Navbar.Collapse id="cute-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}