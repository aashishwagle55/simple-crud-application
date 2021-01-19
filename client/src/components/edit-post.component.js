import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function EditPost() {
    const [username, setUsername] = useState('')
    const [postContent, setPostContent] = useState('')

    const location = useLocation()
    const id = location.pathname.split('/').pop()

    useEffect( () => {
        let _mounted = true
        axios.get(`/posts/${id}`)
        .then( response => {
                if (_mounted){
                    setUsername(response.data.username)
                    setPostContent(response.data.postContent)
                }
            })
        return () => {
            _mounted = false
        }
       
    }, [])

    function onChangePostContent(e) { setPostContent(e.target.value) }

    function onSubmit(e) {
        e.preventDefault()

        const post = {
            username: username,
            postContent: postContent,
        }

        console.log(post)

        axios.put(`/posts/${id}`, post)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))

        window.location = '/'
    }

    return(
        <div>
            <h3>Edit post</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        disabled={true}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Post Content</label>
                    <input
                        type="text"
                        value={postContent}
                        onChange={onChangePostContent}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Edit Post"
                        className="btn btn-primary"
                        disabled={!postContent}
                    />
                </div>
            </form>
        </div>
    )
}

export default EditPost