import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

function Post(props) {
    return(
        <Col xs={12} sm={12} md={12} lg={6} key={props.props._id}>
            <div style={{border: '2px solid black', margin: '15px auto', float: 'left', width: '100%'}}>
                <Row>
                    <Col xs={12} sm={9} md={9} lg={9} style={{margin: 'auto'}}>
                        <div style={{width: 'auto', float: 'left', padding: '15px'}}>
                            <h3>{props.props.username}</h3>
                            <p>{props.props.postContent}</p>
                        </div>
                    </Col>
                    <Col xs={12} sm={3} md={3} lg={3} style={{margin: 'auto'}}>
                        <div style={{width: 'fit-content', padding: '10px', margin: 'auto', textAlign: 'center'}}>
                            <Row>
                                <Col xs={6} sm md lg={12} style={{padding: '5px'}}>
                                    <Link to={`/edit/${props.props._id}`}>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                </Col>
                                <Col xs={6} sm md lg={12} style={{padding: '5px'}}>
                                    <a href="#">
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={ () => props.deletePost(props.props._id)}
                                        >
                                            Delete
                                        </button>
                                    </a>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}

export default Post