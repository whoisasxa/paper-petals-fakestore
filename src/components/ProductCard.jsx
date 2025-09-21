import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function ProductCard({ product }) {
    return (
        <Card className="h-100 cute">
            <Card.Img variant="top" src={product.image} alt={product.title} style={{ objectFit: 'contain', height: 220 }} />
            <Card.Body>
                <Card.Title className="fs-6">{product.title}</Card.Title>
                <Card.Text className="fw-bold">${product.price?.toFixed?.(2) ?? product.price}</Card.Text>
                <div className="d-flex gap-2">
                    <Button as={Link} to={`/products/${product.id}`} className="btn-cute">View</Button>
                    <Button as={Link} to={`/edit-product/${product.id}`} variant="outline-secondary">Edit</Button>
                </div>
            </Card.Body>
        </Card>
    )
}