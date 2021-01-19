import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from './components/navbar.component'
import Home from './components/home.component'
import Create from './components/create.component'
import Read from './components/read.component'
import EditPost from './components/edit-post.component'
import DeleteUser from './components/delete-user.component'

function App() {
  return(
    <Router>
      <div>
        <NavBar />
        <br/>
        <div className='container'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/create' exact component={Create} />
            <Route path='/read' exact component={Read} />
            <Route path='/edit/:id' exact component={EditPost} />
            <Route path='/deleteUser' exact component={DeleteUser} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App