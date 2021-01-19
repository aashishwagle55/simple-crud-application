import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'

function DeleteUser() {
    const [userToDelete, setUserToDelete] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [defaultOption, setDefaultOption] = useState('Type username...')

    useEffect( () => {
        let _mounted = true
        axios.get(`/users`)
        .then( response => {
                if (_mounted){
                    setUsers(response.data.map( item => item ))
                    setLoading(false)
                }
            })
            .catch( err => console.log('Error ', err) )
        return () => {
            _mounted = false
        }
    }, [users])

    function onClickDeleteUser(e) {
        e.preventDefault()

        users.forEach( user => {
            if (user.username === defaultOption) {
                setUserToDelete(user)
            }
        })
    }

    useEffect(() => {
        let _mounted = true
        if (_mounted){
            if(userToDelete._id){
                if (userToDelete.postsId.length > 0) {
                    userToDelete.postsId.forEach( item => {
                        axios.delete(`/posts/${item}`)
                        .then( response => console.log(response.data) )
                        .catch( err => console.log(err) )
                    })
                }

                axios.delete(`/users/${userToDelete._id}`)
                    .then( response => console.log(response.data) )
                    .catch( err => console.log(err) )
        
                setUsers( users.filter(item => item.username !== defaultOption) )
                setDefaultOption('Type username...')
            }
        }
        return () => {
            _mounted = false
        }
       
    }, [userToDelete])

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
                        users.length > 0
                        ?
                        <div style={{margin: '0 auto'}}>
                            <div style={{margin: 'auto', textAlign: 'center'}}>
                                <h3>Search by username</h3>
                            </div>

                            <div style={{border: '2px solid black', padding: '15px', margin: 'auto', marginBottom: '50px'}}>
                                <form onSubmit={onClickDeleteUser}>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            list="userListOptions"
                                            id="userList"
                                            onClick={ () => setDefaultOption('') }
                                            onBlur={ () => defaultOption ? null : setDefaultOption('Type username...') }
                                            onChange={ (e) => {
                                                setDefaultOption(e.target.value) 
                                            }}
                                            value={defaultOption}
                                        />
                                        <datalist id="userListOptions">
                                            {
                                                users.map( item => <option value={item.username} key={item._id} />)
                                            }
                                        </datalist>
                                    </div>

                                    <div className="form-group" style={{textAlign: 'center'}}>
                                        <input
                                            type="submit"
                                            value="Delete User"
                                            className="btn btn-primary"
                                            disabled={!defaultOption || (defaultOption==='Type username...')}
                                        />
                                    </div>
                                </form>
                            </div>

                            <div style={{margin: 'auto', textAlign: 'center'}}>
                                <h2>All Users</h2>
                            </div>
                            <div style={{border: '2px solid black'}}>
                                {
                                    users.map( item => {
                                        return(
                                            <div style={{padding: '15px'}} key={item._id}>
                                                <Row>
                                                    <Col xs={12} sm={12} md={12} lg={12}>
                                                        <h3 style={{textAlign: 'center', verticalAlign:'center', margin: 'auto'}}>{item.username}</h3>
                                                    </Col>
                                                    <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: 'center'}}>
                                                        <a href="#">
                                                            <button
                                                                className="btn btn-primary"
                                                                type="button"
                                                                onClick={ (e) => {
                                                                    users.forEach( user => {
                                                                        if (user.username === item.username) {
                                                                            setUserToDelete(item)
                                                                        }
                                                                    })
                                                                }}
                                                                >
                                                                Delete User
                                                            </button>
                                                        </a>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        <div style={{margin: '0 auto'}}>
                            <Col>
                                <div style={{border: '2px solid black', padding: '15px', marginBottom: '15px'}}>
                                    <h3>No users registered</h3>
                                </div>
                            </Col>
                        </div>
                    }
                </Row>
            }
        </Container>
    )   
}

export default DeleteUser