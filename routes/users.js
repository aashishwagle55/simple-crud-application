const express = require('express')
const router = express.Router()

let User = require('../models/user.model')

router.route('/').get( (req, res) => {
    User.find()
        .then( response => res.json(response) )
        .catch( err => res.status(400).json(`Error: ${err}`) )
})

router.route('/').post( (req, res) => {
    const newUser = new User({
        username: req.body.username
    })

    newUser.save()
        .then( () => res.json('User added') )
        .catch( err => res.status(400).json(`Error: ${err}`) )
})

router.route('/:id').put( (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then( () => res.json('User Edited') )
        .catch( err => res.status(400).json(`Error: ${err}`) )
})

router.route('/:id').delete( (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then( () => res.json('User Deleted') )
        .catch( err => res.status(400).json(`Error: ${err}`) )
})

router.route('/:username').patch( (req, res) => {
    const postId = req.body.postId
    const username = req.params.username

    User.updateOne(
        { username: username },
        { $push: { postsId: postId } }
    )
        .then( () => res.json('Post Added') )
        .catch( err => res.status(400).json(`Error: ${err}`) )
})

module.exports = router