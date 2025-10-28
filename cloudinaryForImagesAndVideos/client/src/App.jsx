import React from 'react'
import { useState } from 'react'
import { Modal, Form, Button } from "react-bootstrap"
import axios from "axios"
import { useEffect } from 'react'

const App = () => {
  const [images, setImages] = useState([])
  const [show, setShow] = useState(false)
  const [data, setData] = useState()
  useEffect(() => {
    axios.get("http://localhost:7000/images")
      .then((response) => {
        console.log(response.data);
        setData(response.data)
      })
      .catch((err) => {
        console.log("GET error:", err);
      });

  }, [])
  const closeModal = () => {
    setShow(false)
  }
  const handleImage = (x) => {
    const imagesList = Array.from(x.target.files)
    setImages(imagesList)
    // console.log(imagesList);
  }
  // console.log(images);
  const submitDetails = (x) => {
    x.preventDefault()
    const formImage = new FormData()
    images.forEach((img) => {
      formImage.append("image", img)
    })
    axios.post("http://localhost:7000/images", formImage)
      .then(() => alert("done"))
      .catch((err) => console.log(err))
    closeModal()
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
              <Form.Control name='image' type="file" multiple onChange={handleImage} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={closeModal}>Cancel</Button>
            <Button variant="primary" type="submit">Save Recipe</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {data?.map((x) => (
        <div key={x.id} style={{ marginBottom: "30px" }}>
          <h5>Recipe ID: {x.id}</h5>
          {x.img.length > 1 ?
            <img src={x.img[0]} alt="Recipe" style={{ width: "200px", margin: "10px", borderRadius: "8px" }}/>
            :
            x.img.map((url, idx) => {
              return (
                <img src={url.url} alt={`Recipe ${idx}`} style={{ height: "300px", objectFit: "cover" }} />
              )
            })
          }
        </div>
      ))}
    </div>
  )
}

export default App