import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'
import axios from 'axios'

import Post from './post.component'
import Prompt from './prompt.component'

function Read() {
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [allPosts, setAllPosts] = useState(false)
    const [postsByUser, setPostsByUser] = useState(false)

    useEffect( () => {
        let _mounted = true
            Promise.all([axios.get(`/users`), axios.get(`/posts`)])
            .then(([response1, response2]) => {
                if (_mounted){
                    setUsers(response1.data.map( item => item.username ))
                    setPosts(response2.data.map( item => item ))                   
                    setLoading(false)
                }
            })
            .catch(err => console.log(err))

            // axios.get(`/users`)
            // .then( response => {
            //     setUsers(response.data.map( item => item.username ))
            // })
            // .catch( err => console.log('Error ', err) )

            // axios.get(`/posts`)
            // .then( response => {
            //     setPosts(response.data.map( item => item ))
            // })
            // .catch( err => console.log('Error ', err) )
        
        return () => {
            _mounted = false
        }
    }, [])

    function onClickGetAll() {
        setAllPosts(true)
        if (postsByUser) { setPostsByUser(false) }
    }

    function onClickByUser(e) {
        // console.log(e)
        setUserPosts(posts.filter( item => item.username === e ))
        if (allPosts) { setAllPosts(false) }
        setPostsByUser(true)
    }

    function onClickClear() {
        if (allPosts) { setAllPosts(false) }
        if (postsByUser) { setPostsByUser(false) }
    }

    function onClickDelete(id) {
        axios.delete(`/posts/${id}`)
            .then( response => console.log(response.data) )
            .catch( err => console.log(`Error: ${err}`) )

        setPosts(posts.filter( post => post._id!==id))
        setUserPosts(userPosts.filter( post => post._id!==id))
    }

    return(
        loading 
        ?
        <Container>
            <h2>Loading ...</h2>
        </Container>
        :
        <Container>
            <Row style={{textAlign: 'center'}}>
                <Col xs={12} sm={12} md={4} lg={4} style={{marginTop: '10px'}}>
                    {/* <label>Get all posts</label> */}
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={onClickGetAll}
                    >
                        Get all posts
                    </button>
                </Col>

                <Col xs={12} sm={12} md={4} lg={4} style={{marginTop: '10px'}}>
                    {/* <label>Get posts by user</label> <br/> */}
                    <Form>
                        <Row>
                            <Col>
                                <ButtonGroup>
                                    <DropdownButton as={ButtonGroup} title="Get post by user" id="bg-nested-dropdown" onSelect={onClickByUser}>
                                        {users.map( item => {
                                            return(
                                                <Dropdown.Item key={item} eventKey={item}>{item}</Dropdown.Item>
                                            )
                                        })}
                                    </DropdownButton>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Form>
                </Col>

                <Col xs={12} sm={12} md={4} lg={4} style={{marginTop: '10px'}}>
                    {/* <label>Clear</label> <br/> */}
                    <button 
                        className="btn btn-primary" 
                        type="button"
                        onClick={onClickClear}
                    >
                        Clear
                    </button>
                </Col>
            </Row>

            <br/>
            <br/>

            {
                allPosts 
                ? 
                <Container>
                    <Row>
                        {
                            posts.length > 0
                            ?
                            posts.map( item => {
                                return(
                                    <Post key={item._id} props={item} deletePost={onClickDelete}/>
                                )
                            })
                            :
                            <Col xs sm md lg={'auto'} style={{margin: '0 auto'}}>
                                <div style={{border: '2px solid black', padding: '15px', marginBottom: '15px'}}>
                                    <h3>Wow. Such empty.</h3>
                                </div>
                            </Col>
                        }
                    </Row>
                </Container> 
                : 
                !allPosts && !postsByUser
                ?
                <Prompt />
                :
                null
            }

            {
                postsByUser 
                ?
                <Container>
                    <Row>
                        {
                            (userPosts.length > 0)
                            ?
                            userPosts.map( item => {
                                return(
                                    <Post key={item._id} props={item} deletePost={onClickDelete}/>
                                )
                            })
                            :
                            <Col xs sm md lg={'auto'} style={{margin: '0 auto'}}>
                                <div style={{border: '2px solid black', padding: '15px', marginBottom: '15px'}}>
                                    <h3>Wow. Such empty.</h3>
                                </div>
                            </Col>                                                    
                        }
                    </Row>
                </Container> 
                :
                null
            }
        </Container>
    )
}

export default Read