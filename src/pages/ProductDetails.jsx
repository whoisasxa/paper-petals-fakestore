import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Row, Col, Button, Badge } from 'react-bootstrap'
import api from '../api'
import Loader from '../components/Loader'
import ErrorAlert from '../components/ErrorAlert'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'


export default function ProductDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [deleting, setDeleting] = useState(false)


    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get(`/products/${id}`)
                setProduct(data)
            } catch {
                setError('Could not load this product.')
            } finally { setLoading(false) }
        })()
    }, [id])


    const handleDelete = async () => {
        setDeleting(true)
        try {
            await api.delete(`/products/${id}`)
            setShowModal(false)
            navigate('/products', { replace: true })
        } catch {
            setError('Delete failed. Please try again.')
        } finally {
            setDeleting(false)
        }
    }


    if (loading) return <Loader />
    if (error) return <ErrorAlert message={error} />
    if (!product) return null


    return (
        <>
            <Row className="g-4">
                <Col md={5}>
                    <img src={product.image} alt={product.title} className="img-fluid rounded-4 border" style={{ background: '#fff' }} />
                </Col>
                <Col md={7}>
                    <h2 className="fw-bold">{product.title}</h2>
                    <div className="d-flex gap-2 align-items-center mb-2">
                        <Badge bg="light" text="dark" className="border">{product.category}</Badge>
                        <span className="fw-bold fs-5">${product.price?.toFixed?.(2) ?? product.price}</span>
                    </div>
                    <p>{product.description}</p>
                    <div className="d-flex gap-2">
                        <Button variant="outline-secondary" as={Link} to={`/edit-product/${product.id}`}>Edit</Button>
                        <Button className="btn-cute" onClick={() => setShowModal(true)} disabled={deleting}>
                            {deleting ? 'Deleting…' : 'Delete'}
                        </Button>
                        <Button variant="outline-cute">Add to Cart (demo)</Button>
                    </div>
                    <p className="text-muted mt-3 small">* FakeStoreAPI: delete will appear successful but won’t persist.</p>
                </Col>
            </Row>


            <ConfirmDeleteModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                itemLabel={product.title}
            />
        </>
    )
}