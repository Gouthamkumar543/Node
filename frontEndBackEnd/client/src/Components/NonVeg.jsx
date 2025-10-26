import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Button, Card, Modal, Form } from 'react-bootstrap'

const NonVeg = () => {
    const [nonVegData, setNonVegData] = useState([])
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState({})
    const { id } = details
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:7000/nonveg');
                // console.log(response.data);
                setNonVegData(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);
    const deleteRecipie = (item) => {
        console.log(item);
        axios.delete(`http://localhost:7000/nonveg/${item.name}`)
        setNonVegData(prev => prev.filter(x => x.name !== item.name))
        alert("Item deleted sucessfully")
    }
    const editRecipie = (item) => {
        setShow(true)
        setDetails(item)
    }
    const handleDetails = (x) => {
        setDetails({ ...details, [x.target.name]: x.target.value })
    }
    const closeModal = () => {
        setShow(false)
    }
    const editRecipieDetails = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:7000/nonveg/${id}`, details)
            .then(() => {
                setNonVegData(prev => prev.map(item => item.id === id ? details : item))
                setShow(false)
                alert("Updated sucessfully")
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div>
            {
                nonVegData.map((x) => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={x.image} />
                            <Card.Body>
                                <Card.Title>{x.name}</Card.Title>
                                <Card.Text>{x.info}</Card.Text>
                                <Button variant="primary" onClick={() => editRecipie(x)}>add to cart</Button>
                                <Button variant="danger" onClick={() => deleteRecipie(x)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    )
                })
            }
            {
                <Modal show={show} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Recipe</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={editRecipieDetails}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Recipe Name</Form.Label>
                                <Form.Control name='name' type="text" onChange={handleDetails} value={details.name} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Recipe Image</Form.Label>
                                <Form.Control name='image' type="text" onChange={handleDetails} value={details.image} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Recipe Description</Form.Label>
                                <Form.Control name='info' as={'textarea'} type="text" onChange={handleDetails} value={details.info} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>type</Form.Label>
                                <Form.Select name='type' onChange={handleDetails} value={details.type} required >
                                    <option value="">Select Type</option>
                                    <option value="nonveg">NonVeg</option>
                                    <option value="veg">Veg</option>
                                </Form.Select>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={closeModal}>Close</Button>
                            <Button variant="primary" type="submit">Save Recipe</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            }

        </div>
    )
}
export default NonVeg