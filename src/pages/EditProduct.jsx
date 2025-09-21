import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import api from '../api'   // ✅ using the helper instance
import Loader from '../components/Loader'
import ErrorAlert from '../components/ErrorAlert'

export default function EditProduct() {
    const { id } = useParams()
    const [form, setForm] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get(`/products/${id}`)   // ✅ call with api helper
                setForm({
                    title: data.title,
                    price: data.price,
                    description: data.description,
                    category: data.category,
                    image: data.image
                })
            } catch {
                setError('Failed to load product.')
            } finally {
                setLoading(false)
            }
        })()
    }, [id])

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form) return
        setSaving(true); setError(''); setSuccess('')
        try {
            const payload = { ...form, price: Number(form.price) }
            await api.put(`/products/${id}`, payload)   // ✅ call with api helper
            setSuccess('Product updated! (Mock success — will not persist)')
        } catch {
            setError('Update failed. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <Loader />
    if (error) return <ErrorAlert message={error} />
    if (!form) return null

    return (
        <Card className="p-4 cute">
            <h3 className="mb-3">Edit Product</h3>
            {success && <div className="alert alert-success">{success}</div>}
            <Form onSubmit={handleSubmit} className="row g-3">
                <Form.Group className="col-md-6">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" value={form.title} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="col-md-6">
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="col-12">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={4} name="description" value={form.description} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="col-md-6">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category" value={form.category} onChange={handleChange}>
                        <option value="notebooks">notebooks</option>
                        <option value="paper">paper</option>
                        <option value="cards">cards</option>
                        <option value="stationery">stationery</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="col-md-6">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control name="image" value={form.image} onChange={handleChange} />
                </Form.Group>
                <div className="col-12 d-flex gap-2">
                    <Button type="submit" className="btn-cute" disabled={saving}>
                        {saving ? 'Saving…' : 'Save Changes'}
                    </Button>
                </div>
            </Form>
        </Card>
    )
}