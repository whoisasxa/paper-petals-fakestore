import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import api from '../api'
import ErrorAlert from '../components/ErrorAlert'


export default function AddProduct() {
    const [form, setForm] = useState({ title: '', price: '', description: '', category: 'notebooks', image: 'https://i.imgur.com/JC0Z7Sx.png' })
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)


    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))


    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setError(''); setSuccess('')
        try {
            const payload = { ...form, price: Number(form.price) }
            await api.post('/products', payload)
            setSuccess('Product created! (Mock success — will not persist)')
            setForm({ title: '', price: '', description: '', category: 'notebooks', image: 'https://i.imgur.com/JC0Z7Sx.png' })
        } catch {
            setError('Create failed. Please try again.')
        } finally { setSubmitting(false) }
    }

    return (
        <Card className="p-4 cute">
            <h3 className="mb-3">Add Product</h3>
            {error && <ErrorAlert message={error} />}
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
                    <Form.Text>Use any valid image URL.</Form.Text>
                </Form.Group>
                <div className="col-12 d-flex gap-2">
                    <Button type="submit" className="btn-cute" disabled={submitting}>{submitting ? 'Saving…' : 'Create'}</Button>
                </div>
            </Form>
        </Card>
    )
}