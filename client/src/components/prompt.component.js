import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Prompt() {
    return(
        <Container>
            <Row>
                <div style={{margin: '0 auto'}}>
                    <Col>
                        <div style={{border: '2px solid black', padding: '15px', marginBottom: '15px'}}>
                            <h3>Select an option</h3>
                        </div>
                    </Col>
                </div>
            </Row>
        </Container>
    )
}

export default Prompt