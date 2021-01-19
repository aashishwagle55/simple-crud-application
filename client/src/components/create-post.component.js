import React, { useState, useEffect } from 'react'
import axios from 'axios'

function CreatePost() {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [postContent, setPostContent] = useState('')
    const [users, setUsers] = useState([])
    const [defaultOption, setDefaultOption] = useState('Type username...')

    useEffect( () => {
        let _mounted = true
        axios.get(`/users`)
            .then( response => {
                if (_mounted){
                    if (response.data.length > 0) {
                        setUsers(response.data.map( user => user ))
                    }
                setLoading(false)
                }
            })
            .catch( err => console.log(err) )
        return () => {
            _mounted = false
        }
       
    }, [users])

    function onChangePostContent(e) { setPostContent(e.target.value) }

    function onSubmit(e) {
        e.preventDefault()

        let posted = false

        users.some( item => {
            if (item.username === username) {
                const post = {
                    username: username,
                    postContent: postContent,
                }
        
                axios.post(`/posts`, post)
                    .then( response => {
                        const postId = response.data
                        axios.patch(`/users/${username}`, { postId })
                            .then( res => console.log(res.data) )
                            .catch( error => console.log(error) )
                    })
                    .catch( error => console.log(error) )
        
                setUsername('')
                setPostContent('')
                setDefaultOption('Type username...')

                posted = true
            }

            return (item.username === username)
        })

        if(!posted) {
            alert('Invalid User')
            setUsername('')
            setPostContent('')
            setDefaultOption('Type username...')
        }

    }

    return(
        loading
        ?
        <div>
            <h3>Loading...</h3>
        </div>
        :
        !users.length > 0
        ?
        <div className="row">
            <div style={{margin: '0 auto'}}>
                <div className="col">
                    <div style={{border: '2px solid black', padding: '15px', marginBottom: '15px'}}>
                        <h3>No users registered</h3>
                    </div>
                </div>
            </div>
        </div>
        :
        <div>
            <h3>Create new post</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        className="form-control"
                        list="userListOptions"
                        id="userList"
                        onClick={ () => setDefaultOption('') }
                        onBlur={ () => defaultOption ? null : setDefaultOption('Type username...') }
                        onChange={ (e) => { 
                            setUsername(e.target.value)
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

                <div className="form-group">
                    <label>Post Content</label>
                    <textarea
                        value={postContent}
                        onChange={onChangePostContent}
                        className="form-control"
                        rows="5"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Post"
                        className="btn btn-primary"
                        disabled={!postContent || !username}
                    />
                </div>
            </form>
        </div>
    )
}

export default CreatePost