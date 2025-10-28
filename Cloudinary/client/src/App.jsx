import React, { useState } from 'react'
import { Button, Modal, Form } from "react-bootstrap"
import axios from "axios"

const App = () => {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState(null)
  const closeModal = () => {
    setShow(false)
  }
  const handleImage = (x) => {
    // console.log(x.target.files)
    // console.log(x.target.files[0]);
    setImage(x.target.files[0])
  }
  const submitDetails = (x) => {
    x.preventDefault()
    const formImage = new FormData()
    formImage.append("imageFile", image)
    try {
      axios.post("http://localhost:7000/images", formImage)
      alert("Posted sucessfully")
      setShow(false)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      <Button onClick={() => setShow(true)}>Open</Button>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Recipe</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitDetails}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Recipe Image</Form.Label>
              <Form.Control name='image' type="file" placeholder="Enter image URL or path" onChange={handleImage} required />
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

export default App