import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Form, Button } from 'react-bootstrap'

const SignUp = () => {
    const [show, setShow] = useState(true)
    const [formDetails, setFormDetails] = useState({})
    const Navigate = useNavigate()
    const handleDetails = (x) => {
        setFormDetails({...formDetails,[x.target.name]:x.target.value})
        // console.log(formDetails)
    }
    const closeModal = () => {
        setShow(false)
        Navigate("/")
    }
    const submitDetails = () => {
        try {
            axios.post("http://localhost:7000/jobportal/auth/signup",formDetails)
            alert("Added sucessfully")
            Navigate("/")
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
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' type="text" placeholder="e.g. Goutham Kumar" onChange={handleDetails} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gmail</Form.Label>
                            <Form.Control name='email' type="email"  placeholder="goutham@gmail.com" onChange={handleDetails} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name='password' type="password" onChange={handleDetails} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select name='role' onChange={handleDetails} required >
                                <option value="">Select Type</option>
                                <option value="fullstack">Fullstack</option>
                                <option value="frontend">FrontEnd</option>
                                <option value="backend">BackEnd</option>
                            </Form.Select>
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

export default SignUp