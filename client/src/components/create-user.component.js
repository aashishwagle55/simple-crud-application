import React, { useState } from 'react'
import axios from 'axios'

function CreateUser() {
    const [username, setUsername] = useState('')

    function onChangeUsername(e) { setUsername(e.target.value) }

    function onSubmit(e) {
        e.preventDefault()

        const user = {
            username: username
        }

        axios.post(`/users`, user)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))

        setUsername('')
    }

    return(
        <div>
            <h3>Create new user</h3>
            <br/>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label><h5>Username</h5></label>
                    <input
                        type="text"
                        value={username}
                        onChange={onChangeUsername}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Create User"
                        className="btn btn-primary"
                        disabled={!username}
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateUser