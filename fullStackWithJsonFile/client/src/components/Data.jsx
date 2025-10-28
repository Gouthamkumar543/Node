import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Card, Button, Modal, Form } from "react-bootstrap"

const Data = () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/food")
                // console.log(response);
                setData(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [])
    const deleteRecipie = (item) => {
        try {
            axios.delete(`http://localhost:5000/food/${item.id}`)
            alert("Item deleted sucessfully")
            setData(prev => prev.filter(x => x.id !== item.id))
        } catch (err) {
            console.log(err);
        }
    }
    const editRecipie = (item) => {
        setShow(true)
        setDetails(item)
    }
    const handleDetails = (x) => {
        setDetails({ ...details, [x.target.name]: x.target.value })
    }
    const closeModal = ()=>{
        setShow(false)
    }
    const editRecipieDetails = () => {
        const {id} = details
        try {
            axios.put(`http://localhost:5000/food/${id}`,details)
            alert("Updated sucessfully")
            setData(prev => prev.map(x => x.id === id ? data : x))
            setShow(false)
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            {
                data.map((x) => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={x.image} />
                            <Card.Body>
                                <Card.Title>{x.name}</Card.Title>
                                <Card.Text>{x.info}</Card.Text>
                                <Card.Text>{x.revie}</Card.Text>
                                <Button variant="primary" onClick={() => editRecipie(x)}>editRecipie</Button>
                                <Button variant="danger" onClick={() => deleteRecipie(x)}>Delete</Button>
                            </Card.Body>
                        </Card>)
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
                            <Form.Group className="mb-3">
                                <Form.Label>Recipe review</Form.Label>
                                <Form.Control name='review' as={'textarea'} type="text" onChange={handleDetails} value={details.review} required />
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

export default Data