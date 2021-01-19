import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        axios.get(`/posts`)
            .then( response => {
                const postsResponse = response.data.map( item => item )
                setPosts(postsResponse.reverse())
            })
            .catch( err => console.log('Error ', err) )

        setLoading(false)
    }, [])

    return(
        loading 
        ?
        <Container>
            <h2>Loading ...</h2>
        </Container>
        :
        <Container>
            {
                <Row>
                    {
                        posts.length > 0
                        ?
                        <Col xs={12} sm={11} md={9} lg={7} style={{margin: '0 auto', width: '100%'}}>
                        {
                            posts.map( item => {
                                return(
                                    <div style={{border: '2px solid black', width:'80%', padding: '15px', margin: '15px auto'}} key={item._id}>
                                        <h3>{item.username}</h3>
                                        <p>{item.postContent}</p>
                                    </div>
                                )
                            })
                        }
                        </Col>
                        :
                        <div style={{margin: '0 auto'}}>
                            <Col>
                                <div style={{border: '2px solid black', padding: '15px', marginBottom: '15px'}}>
                                    <h3>Wow. Such empty.</h3>
                                </div>
                            </Col>
                        </div>
                    }
                </Row>
            }
        </Container>
    )
}

export default Home