import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Card } from 'react-bootstrap'

const Veg = () => {
    const [vegData, setVegData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:7000/veg")
                // console.log(response.data);
                setVegData(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [])
    return (
        <div>
            {
                vegData.map((x) => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={x.image} />
                            <Card.Body>
                                <Card.Title>{x.name}</Card.Title>
                                <Card.Text>{x.info}</Card.Text>
                                <Button variant="primary">add to cart</Button>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default Veg