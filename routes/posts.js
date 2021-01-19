const express = require('express')
const router = express.Router()

let Post = require('../models/post.model')

router.route('/').get( (req, res) => {
    Post.find()
        .then( response => res.json(response) )
        .catch( err => res.status(400).json(`Error: ${err}`) )
})

router.route('/:id').get( (req, res) => {
    Post.findById(req.params.id)
        .then( response => res.json(response) )
        .catch( err => res.status(400).json(`Error: ${err}`) )
})

router.route('/').post( (req, res) => {
    const newPost = new Post({
        username: req.body.username,
        postContent: req.body.postContent,
        // date: Date.parse(req.body.date)
    })

    newPost.save()
        .then( () => res.json(newPost._id) )
        .catch( err => res.status(400).json(`Error: ${err}`) )
})

router.route('/:id').put( (req, res) => {
    Post.findByIdAndUpdate( req.params.id, req.body )
        .then( () => res.json('Post Updated') )
        .catch( err => res.status(400).json(`Error: ${err}`) )
})

router.route('/:id').delete( (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then( () => res.json('Post deleted'))
        .catch( err => res.status(400).json(`Error: ${err}`) )
})

module.exports = router