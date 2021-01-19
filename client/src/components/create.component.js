import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Prompt from './prompt.component'
import CreateUser from './create-user.component'
import CreatePost from './create-post.component'

function Create() {
    const [createUser, setCreateUser] = useState(false)
    const [createPost, setCreatePost] = useState(false)

    function onClickCreateUser() {
        setCreateUser(true)
        if (setCreatePost) { setCreatePost(false) }
    }

    function onClickCreatePost() {
        setCreatePost(true)
        if (setCreateUser) { setCreateUser(false) }
    }

    function onClickClear() {
        setCreateUser(false)
        setCreatePost(false)
    }

    return(
        <Container>
            <Row style={{textAlign: 'center'}}>
                <Col xs={12} sm={12} md={4} lg={4} style={{marginTop: '10px'}}>
                    {/* <label>Create new user</label> */}
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={onClickCreateUser}
                    >
                        Create new User
                    </button>
                </Col>

                <Col xs={12} sm={12} md={4} lg={4} style={{marginTop: '10px'}}>
                    {/* <label>Create new Post</label> <br/> */}
                    <button 
                        className="btn btn-primary" 
                        type="button"
                        onClick={onClickCreatePost}
                    >
                        Create new post
                    </button>
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
                createUser
                ?
                <Container>
                    <CreateUser />
                </Container>
                :
                !(createUser || createPost)
                ?
                <Prompt />
                :
                null
            }

            {
                createPost
                ?
                <Container>
                    <CreatePost />
                </Container>
                :
                null
            }
        </Container>
    )
}

export default Create