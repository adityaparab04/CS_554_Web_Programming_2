const express = require('express');
const router = express.Router();
const data = require('../data');
const blogsData = data.blogs;
const userData = data.users;
let { ObjectId } = require('mongodb');

//user signup
router.post('/signup', async (req, res) => {
    let userInfo = req.body;
    userInfo.username = userInfo.username.toLowerCase();
    
    //error handling for name
    if(!userInfo.name){
        res.status(400).json({e: 'enter a name'})
        return;
    };
    if(typeof userInfo.name !== 'string'){
        res.status(400).json({e: 'enter a name as string'})
        return;
    };
    if(!userInfo.name.replace(/\s/g, "").length || userInfo.name.indexOf(' ') >= 0){
        res.status(400).json({e: 'dont enter empty strings'})
        return;
    };
    if(userInfo.name.replace(/[^A-Za-z]/g, "").length !== userInfo.name.length){
        res.status(400).json({e: 'name should only contain alphabets'})
        return;
    };
    //error handling for username
    if(!userInfo.username){
        res.status(400).json({e: 'enter a user name'})
        return;
    };
    if(typeof userInfo.username !== 'string'){
        res.status(400).json({e: 'enter a user name as string'})
        return;
    };
    if(!userInfo.username.replace(/\s/g, "").length || userInfo.username.indexOf(' ') >= 0){
        res.status(400).json({e: 'dont enter empty strings'})
        return;
    };
    if(userInfo.username.replace(/[^0-9a-z]/g, "").length !== userInfo.username.length){
        res.status(400).json({e: 'only alphanumeric characters allowed'})
        return;
    };
    if(userInfo.username.length < 4){
        res.status(400).json({e: 'username less than 4 chars'})
        return;
    };

    //error handling for password
    if(!userInfo.password){
        res.status(400).json({e: 'enter password'})
        return;
    };
    if(typeof userInfo.password !== 'string'){
        res.status(400).json({e: 'password should be string'})
        return;
    }
    if(!userInfo.password.replace(/\s/g, "").length || userInfo.password.indexOf(' ') >= 0){
        res.status(400).json({e: 'dont enter empty strings for password'})
        return;
    }
    if(userInfo.password.length < 6){
        res.status(400).json({e: 'password should be more than 6 chars'})
        return;
    };

    try{
        const newUser = await userData.createUser(
            userInfo.name,
            userInfo.username,
            userInfo.password
        );
        res.status(200).json(newUser);
    }catch (e) {
        res.status(401).json(e);
    }
});

//user login
router.post('/login', async (req, res) => {
    let userInfo = req.body;
    userInfo.username = userInfo.username.toLowerCase();
    //error handling for username
    if(!userInfo.username){
        res.status(400).json({e: 'enter a user name'})
        return;
    };
    if(typeof userInfo.username !== 'string'){
        res.status(400).json({e: 'enter a user name as string'})
        return;
    };
    if(!userInfo.username.replace(/\s/g, "").length || userInfo.username.indexOf(' ') >= 0){
        res.status(400).json({e: 'dont enter empty strings'})
        return;
    };
    if(userInfo.username.replace(/[^0-9a-z]/g, "").length !== userInfo.username.length){
        res.status(400).json({e: 'only alphanumeric characters allowed'})
        return;
    };
    if(userInfo.username.length < 4){
        res.status(400).json({e: 'username less than 4 chars'})
        return;
    };

    //error handling for password
    if(!userInfo.password){
        res.status(400).json({e: 'enter password'})
        return;
    };
    if(typeof userInfo.password !== 'string'){
        res.status(400).json({e: 'password should be string'})
        return;
    }
    if(!userInfo.password.replace(/\s/g, "").length || userInfo.password.indexOf(' ') >= 0){
        res.status(400).json({e: 'dont enter empty strings for password'})
        return;
    }
    if(userInfo.password.length < 6){
        res.status(400).json({e: 'password should be more than 6 chars'})
        return;
    };
    
    try{
        const getUser = await userData.checkUser(
            userInfo.username,
            userInfo.password
        );
        
        if(getUser){
            req.session.username = userInfo.username;
            req.session.userId = getUser._id
            res.status(200).json(getUser);
        } else{
            res.status(401).json({error:"Cannot Login"});
        }
    }catch(e){
        res.status(401).json(e);
    }
});

//user logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.json('user has logged out')
});

//create a post
router.post('/', async(req, res) =>{
    if(!req.body.title || typeof req.body.title !== 'string' || !req.body.title.replace(/\s/g, "").length){
        res.status(400).json({e: 'enter valid title'});
        return;
    }
    if(!req.body.body || typeof req.body.body !== 'string' || !req.body.body.replace(/\s/g, "").length){
        res.status(400).json({e: 'enter valid blog body'});
        return;
    }
    try{
        const addBlog = await blogsData.createBlog(req.body.title, req.body.body, req.session.userId, req.session.username);
        res.status(200).json(addBlog);
    }catch(e){
        res.status(404).json(e);
    }
});

//get blog by id
router.get('/:id', async(req, res) =>{
    if (!req.params.id || typeof req.params.id !== 'string' || !req.params.id.replace(/\s/g, "").length) {
        res.status(400).json({ e: 'you must provide Id as string' });
        return;
    }
    if (ObjectId.isValid(req.params.id) === false) {
        res.status(400).json({ e: 'Id not a valid object ID' });
        return;
    }
    try{
        let blog =  await blogsData.get(req.params.id);
        res.json(blog);
    }catch(e){
        res.status(404).json(e);
    }
});

router.get('/', async(req, res) => {
    if(req.query.skip){
        if(req.query.skip.replace(/[^0-9]/g, "").length !== req.query.skip.length){
            res.status(400).json({e:'skip should be positive integer'});
            return
        }
        if(req.query.skip<1){
            res.status(400).json({e: 'skip cannot be less than 1'});
            return
        }
    }
    if(req.query.take){
        if(req.query.take.replace(/[^0-9]/g, "").length !== req.query.take.length){
            res.status(400).json({e:'take should be positive integer'});
            return
        }
        if(req.query.take<1){
            res.status(400).json({e: 'take cannot be less than 1'});
            return
        }
    }
    try{
        let allBlogs = await blogsData.getAll(req.query.skip, req.query.take);
        res.status(200).json(allBlogs);
    }catch(e){
        res.status(400).json(e);
    }
});

router.put('/:id', async(req, res) => {
    if (!req.params.id || typeof req.params.id !== 'string' || !req.params.id.replace(/\s/g, "").length) {
        res.status(400).json({ e: 'you must provide Id as string' });
        return;
    }
    if (ObjectId.isValid(req.params.id) === false) {
        res.status(400).json({ e: 'Id not a valid object ID' });
        return;
    }
    try{
        const updateBlog = await blogsData.updateBlog(req.params.id, req.body.title, req.body.body, req.session.userId);
        res.status(200).json(updateBlog);
    }catch(e){
        res.status(400).json(e);
    }
});

router.patch('/:id', async(req, res) =>{
    if (!req.params.id || typeof req.params.id !== 'string' || !req.params.id.replace(/\s/g, "").length) {
        res.status(400).json({ e: 'you must provide Id as string' });
        return;
    }
    if (ObjectId.isValid(req.params.id) === false) {
        res.status(400).json({ e: 'Id not a valid object ID' });
        return;
    }
    try{
        const editBlog = await blogsData.editBlog(req.params.id, req.body.title, req.body.body, req.session.userId);
        res.status(200).json(editBlog);
    }catch(e){
        res.status(400).json(e);
    }
});

router.post('/:id/comments', async(req, res) => {
    const commentInfo = req.body;
    if (!req.params.id || typeof req.params.id !== 'string' || !req.params.id.replace(/\s/g, "").length) {
        res.status(400).json({ e: 'you must provide Id as string' });
        return;
    }
    if (ObjectId.isValid(req.params.id) === false) {
        res.status(400).json({ e: 'Id not a valid object ID' });
        return;
    }
    if(!commentInfo.comment || typeof commentInfo.comment !== "string" || !commentInfo.comment.replace(/\s/g, "").length){
        res.status(400).json({e: 'Invalid comment'});
        return;
    }
    
    try{
        const newComment = await blogsData.addComment(req.params.id, commentInfo.comment, req.session.userId, req.session.username);
        res.status(200).json(newComment);
    }catch(e){
        res.status(400).json(e);
    }
});

router.delete('/:blogId/:commentId', async(req, res) =>{
    if(!req.params.blogId || typeof req.params.blogId !== "string" || !req.params.blogId.replace(/\s/g, "").length){
        res.status(400).json({e: ''})
        return
    }
    if (ObjectId.isValid(req.params.blogId) === false) {
        res.status(400).json({ e: 'blogId not a valid object ID' });
        return;
    }
    if(!req.params.commentId || typeof req.params.commentId !== "string" || !req.params.commentId.replace(/\s/g, "").length){
        res.status(400).json({e: ''})
        return
    }
    if (ObjectId.isValid(req.params.commentId) === false) {
        res.status(400).json({ e: 'commentId not a valid object ID' });
        return;
    }
    try{
        const removeComment = await blogsData.deleteComment(req.params.blogId, req.params.commentId, req.session.userId);
        res.status(200).json(removeComment);
    }catch(e){
        res.status(400).json(e);
    }
});

module.exports = router;