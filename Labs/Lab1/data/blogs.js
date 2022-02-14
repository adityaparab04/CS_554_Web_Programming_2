const mongoCollections = require('../config/mongoCollections');
const blogs = mongoCollections.blogs;
let { ObjectId } = require('mongodb');

let exportedMethods = {
    async createBlog(title, body, userId, username){
        if (arguments.length !== 4){
            throw `Enter all the properties of a blogs`
        }
        if(!title || typeof title !== 'string' || !title.replace(/\s/g, "").length){
            throw `Enter a valid body`
        }
        if(!body || typeof body !== 'string' || !body.replace(/\s/g, "").length){
            throw `Enter a valid body`
        }
        if(!userId || typeof userId !== 'string' || !userId.replace(/\s/g, "").length){
            throw `Enter a valid user Id`
        }
        if(!username || typeof username !== 'string' || !username.replace(/\s/g, "").length){
            throw `Enter a valid username`
        }
        let userObjId = ObjectId(userId);
        let userInfo = {
            _id: userObjId,
            username: username
        }
        let newBlog = {
            title: title,
            body: body,
            userThatPosted: userInfo,
            comments: []
        }
        const blogsCollection = await blogs();
        const insertNewBlog = await blogsCollection.insertOne(newBlog);
        if (insertNewBlog.insertedCount === 0){
            throw `Could not add new blog`;
        }
        const newId = insertNewBlog.insertedId;
        newIdStringFormat = newId.toString()
        const blog = await this.get(newIdStringFormat);
        return blog;
    },
    async get(id){
        if(!id){
            throw `Please enter an id in string format`
        }
        if(typeof id !== 'string' || !id.replace(/\s/g, "").length){
            throw `Entered id not in string format or contains blank spaces only`
        }
        if(ObjectId.isValid(id) === false){
            throw `Entered blogId is not a valid object Id`
        }
        const blogsCollection = await blogs();
        let parseId = ObjectId(id);
        const blog = await blogsCollection.findOne({_id: parseId});
        if(blog === null){
            throw `No blog with that Id`;
        }
        blog._id = blog._id.toString();
        return blog;
    },

    async getAll(skip, take){
        if(skip){
            if(skip.replace(/[^0-9]/g, "").length !== skip.length){
                throw `skip should be positive integer`
            }
            if(skip<1){
                throw `skip cannot be less than 1`
            }
        }
        if(take){
            if(take.replace(/[^0-9]/g, "").length !== take.length){
                throw `take should be positive integer`
            }
            if(take<1){
                throw `take should be more than 0`
            }
        }
        
        skip = parseInt(skip);
        take = parseInt(take);
        // console.log(skip)
        const blogsCollection = await blogs();
        let blogsData = [];
        if(skip && take){
            if(take>100){
                blogsData = await blogsCollection.find({}).skip(skip).limit(100).toArray();
            }else{
                blogsData = await blogsCollection.find({}).skip(skip).limit(take).toArray();
            }
        }else if(skip){
            blogsData = await blogsCollection.find({}).skip(skip).limit(20).toArray();
        }else if(take){
            if(take>100){
                blogsData = await blogsCollection.find({}).limit(100).toArray();
            }else{
                blogsData = await blogsCollection.find({}).limit(take).toArray();
            }
        }
        else{
            blogsData = await blogsCollection.find({}).limit(20).toArray();
        }
        return blogsData;
    },

    async updateBlog(id, title, body, userId){
        if (arguments.length !== 4){
            throw `Enter all the properties of a blogs`
        }
        if(!id){
            throw `Please enter an id in string format`
        }
        if(typeof id !== 'string' || !id.replace(/\s/g, "").length){
            throw `Entered id not in string format or contains blank spaces only`
        }
        if(ObjectId.isValid(id) === false){
            throw `Entered blogId is not a valid object Id`
        }
        if(!title || typeof title !== 'string' || !title.replace(/\s/g, "").length){
            throw `Enter a valid body`
        }
        if(!body || typeof body !== 'string' || !body.replace(/\s/g, "").length){
            throw `Enter a valid body`
        }
        if(!userId || typeof userId !== 'string' || !userId.replace(/\s/g, "").length){
            throw `Enter a valid user Id`
        }
        const blogsCollection = await blogs();
        let parseId = ObjectId(id);
        
        const findBlog = await blogsCollection.findOne({_id: parseId});
        if(findBlog === null){
            throw `Couldn't find the blog with id:${id}`
        }
        if(findBlog.userThatPosted._id.toString() !== userId){
            throw `Cannot replace blog`;
        }
        let newBlog = {
            title: title,
            body: body
        }
        const updatedBlog = await blogsCollection.updateOne(
            { _id: parseId },
            { $set: newBlog }
        );
        if (updatedBlog.modifiedCount === 0){
            throw `Couldn't update the blog with same content`
        }

        return await this.get(id);

    },
    async editBlog(id, title, body, userId){
        if(!id){
            throw `Please enter an id in string format`
        }
        if(typeof id !== 'string' || !id.replace(/\s/g, "").length){
            throw `Entered id not in string format or contains blank spaces only`
        }
        if(ObjectId.isValid(id) === false){
            throw `Entered blogId is not a valid object Id`
        }
        if(title){
            if(typeof title !== 'string' || !title.replace(/\s/g, "").length){
                throw `Entered title not in string format or contains blank spaces only`
            }
        }
        if(body){
            if(typeof body !== 'string' || !body.replace(/\s/g, "").length){
                throw `Entered body not in string format or contains blank spaces only`
            }
        }
        if(!userId || typeof userId !== 'string' || !userId.replace(/\s/g, "").length){
            throw `Enter a valid user Id`
        }
        const blogsCollection = await blogs();
        let parseId = ObjectId(id);
        
        const findBlog = await blogsCollection.findOne({_id: parseId});
        if(findBlog === null){
            throw `Couldn't find the blog with id:${id}`
        }
        if(findBlog.userThatPosted._id.toString() !== userId){
            throw("Cannot edit blog");
        }
        let newBlog = {
            title: title ? title : findBlog.title,
            body: body ? body : findBlog.body
        };

        const editedBlog = await blogsCollection.updateOne(
            {_id: parseId},
            {$set: newBlog}
        );
        if (editedBlog.modifiedCount === 0){
            throw `Couldn't update the blog with same content`
        }
        return this.get(id);
    },
    async addComment(id, comment, userId, username){
        if(!id){
            throw `Please enter an id in string format`
        }
        if(typeof id !== 'string' || !id.replace(/\s/g, "").length){
            throw `Entered id not in string format or contains blank spaces only`
        }
        if(ObjectId.isValid(id) === false){
            throw `Entered commentId is not a valid object Id`
        }
        if(!comment || typeof comment !== 'string' || !comment.replace(/\s/g, "").length) {
            throw `Please enter a valid input comment as a string`
        }
        if(!userId || typeof userId !== 'string' || !userId.replace(/\s/g, "").length){
            throw `Enter a valid user Id`
        }
        const blogsCollection  = await blogs();
        
        let parseId = ObjectId(id);
        let ObjId = ObjectId(userId);
        const findBlog = await blogsCollection.findOne({_id: parseId});
        
        if(findBlog === null){
            throw `Couldn't find the blog with id:${id}`
        }

        let userThatPostedComment = {
            _id: ObjId,
            username: username
        }

        let newComment = {
            _id: new ObjectId(),
            userThatPostedComment: userThatPostedComment,
            comment: comment
        } 
        let commentAdded = await blogsCollection.updateOne(
            {_id: parseId},
            {$push: {comments: newComment}}
        );
        if (commentAdded.modifiedCount === 0){
            throw `Couldn't add the comment on blog of Id ${id}`
        }
        return await this.get(id);
    },
    async deleteComment(blogId, commentId, userId){
        if(!blogId || typeof blogId !== 'string' || !blogId.replace(/\s/g, "").length){
            throw `Enter a valid blog Id`
        }
        if(!userId || typeof userId !== 'string' || !userId.replace(/\s/g, "").length){
            throw `Enter a valid user Id`
        }
        if(!commentId || typeof commentId !== 'string' || !commentId.replace(/\s/g, "").length){
            throw `Enter a valid comment Id`
        }
        const blogsCollection = await blogs();
        
        let blogObjId = ObjectId(blogId);
        let commentObjId = ObjectId(commentId);

        const blog = await blogsCollection.findOne({"comments._id": commentObjId});
        if(blog === null){
            throw `no comment found`
        }
        const reqComment = blog.comments.find(i => i._id.toString() === commentId);
        if(reqComment.userThatPostedComment._id.toString() !== userId){
            throw `cannot delete the comment with different user`;
        }
        const removeComment = await blogsCollection.updateOne(
            { _id: blogObjId},
            { $pull: { comments: {_id: commentObjId}}
        });
        if(removeComment.modifiedCount === 0){
            throw `couldn't delete the comment of Id ${commentId}`
        };
        return `comment deleted`;
    }
}

module.exports = exportedMethods;