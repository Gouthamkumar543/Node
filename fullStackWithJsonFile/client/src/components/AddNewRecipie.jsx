import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Form, Button } from 'react-bootstrap'

const AddNewRecipie = () => {
    const [show, setShow] = useState(true)
    const [details, setDetails] = useState({})
    const Navigate = useNavigate()
    const handleDetails = (x) => {
        setDetails({ ...details, [x.target.name]: x.target.value })
    }
    const closeModal = () => {
        setShow(false)
        Navigate("/data")
    }
    const submitDetails = () => {
        try {
            axios.post("http://localhost:5000/food", details)
            alert("Added sucessfully")
            Navigate("/data")
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Recipe</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitDetails}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control name='name' type="text" placeholder="e.g. Butter Chicken" onChange={handleDetails} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Recipe Image</Form.Label>
                            <Form.Control name='image' type="text" placeholder="Enter image URL or path" onChange={handleDetails} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Recipe Description</Form.Label>
                            <Form.Control name='info' as={'textarea'} type="text" placeholder="How it's made..." onChange={handleDetails} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>type</Form.Label>
                            <Form.Select name='type' onChange={handleDetails} required >
                                <option value="">Select Type</option>
                                <option value="nonveg">NonVeg</option>
                                <option value="veg">Veg</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Recipe review</Form.Label>
                            <Form.Control name='review' as={'textarea'} type="text" onChange={handleDetails} value={details.review} required />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={closeModal}>Cancel</Button>
                        <Button variant="primary" type="submit">Save Recipe</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    )
}

export default AddNewRecipie