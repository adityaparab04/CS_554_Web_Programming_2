const connection = require('../config/mongoConnection');
const data = require('../data/');
const blogs = data.blogs;
const users = data.users;


async function main(){
    const db = await connection.connectToDb();
    // await db.dropDatabase();

    // const blog1 = await blogs.createBlog("sunny day", "It was a sunny day", {"_id": 1, "username": "aditya"});
    // console.log(blog1);
    
    // const blog1 = await blogs.get("61f5b048909fa8c399eb1277")
    // console.log(blog1);

    // const blog2 = await blogs.createBlog("rainy day", "It was a rainy day", {"_id":"2", "username": "rahul"});
    // console.log(blog2);

    // const blog1 = await blogs.updateBlog("61f5b048909fa8c399eb1277", "rainy day");

    // const b = await blogs.getAll(1,22);
    // console.log(b);

    // const c = await blogs.editBlog('61f5b048909fa8c399eb1277', "my best-friend", "Is loyal");
    // console.log(c);

    // const d = await blogs.addComment("61f5b13a3faa2ed1b82f21ab", "i disagree", 2, "aditi");
    // console.log(d);

    // const e = await blogs.deleteComment("61f5b048909fa8c399eb1277", "61f7794dfe814df9bb1a3f2e", "61f71403f944aae73d8a25ab");
    // console.log(e);

    // const f = await users.createUser("aditya", "aparab", "12345");
    // console.log(f);

    // const g = await users.checkUser("hmall11", "12345");
    // console.log(g);
    await connection.closeConnection();
}

main()