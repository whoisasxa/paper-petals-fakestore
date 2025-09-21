import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import api from '../api'
import Loader from '../components/Loader'
import ErrorAlert from '../components/ErrorAlert'
import ProductCard from '../components/ProductCard'


export default function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get('/products')
                setProducts(data)
            } catch {
                setError('Failed to load products. Please try again.')
            } finally { setLoading(false) }
        })()
    }, [])


    if (loading) return <Loader />
    if (error) return <ErrorAlert message={error} />


    return (
        <>
            <h2 className="mb-3">All Products</h2>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                {products.map(p => (
                    <Col key={p.id}><ProductCard product={p} /></Col>
                ))}
            </Row>
        </>
    )
}