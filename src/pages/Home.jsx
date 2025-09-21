import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function Home() {
    return (
        <Row className="align-items-center g-4">
            <Col md={6}>
                <h1 className="fw-bold">Paper Petals</h1>
                <p className="lead">Fun stationery, sweet notebooks, and charming cards for everyday magic. ✨</p>
                <hr className="hr-dotted" />
                <div className="d-flex gap-2">
                    <Button as={Link} to="/products" className="btn-cute">Shop Products</Button>
                    <Button as={Link} to="/add-product" variant="outline-cute">Add Product</Button>
                </div>
                <p className="text-muted mt-3">
                    * Using FakeStoreAPI for learning – create/update/delete actions will show success but won’t persist after refresh.
                </p>
            </Col>
            <Col md={6}>
                <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop" alt="Cute stationery" className="img-fluid rounded-4 shadow-sm" />
            </Col>
        </Row>
    )
}