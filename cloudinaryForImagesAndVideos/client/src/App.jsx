import React from 'react'
import { useState } from 'react'
import { Modal, Form, Button, Carousel } from "react-bootstrap"
import axios from "axios"
import { useEffect } from 'react'

const App = () => {
  const [images, setImages] = useState([])
  const [show, setShow] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get("http://localhost:7000/images")
      .then((response) => {
        // console.log(response.data);
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
      {
        data.map((x) => {
          return (
            <>
              {
                x.img.length === 1 ?
                  <div>
                    <img src={x.img[0].url} alt='img' width={250} />
                  </div> :
                  <Carousel style={{width:550}}>
                    {
                      x.img.map((e) => {
                        return (
                          <Carousel.Item>
                            <img src={e.url} alt='img' width={550}/>
                          </Carousel.Item>
                        )
                      })
                    }
                  </Carousel>
              }
            </>
          )
        })
      }
    </div>
  )
}

export default App