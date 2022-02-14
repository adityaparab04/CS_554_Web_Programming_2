const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcryptjs');
const saltRounds = 10;
let { objectId } = require('mongodb');

let exportedMethods = {
    async createUser(name, username, password){
        username = username.toLowerCase();
        
        //error handling for username
        if(!name){
            throw `please enter a username`
        };
        if(typeof name !== 'string'){
            throw `name should be string`
        };
        if(!name.replace(/\s/g, "").length || name.indexOf(' ') >= 0){
            throw `name cannot be empty spaces or contain empty spaces`
        };
        if(name.replace(/[^a-z]/g, "").length !== name.length){
            throw `name should only contain alphabets`
        };

        //error handling for username
        if(!username){
            throw `please enter a username`
        };
        if(typeof username !== 'string'){
            throw `username must be a string`
        };
        if(!username.replace(/\s/g, "").length || username.indexOf(' ') >= 0){
            throw `username cannot be empty spaces or contain empty spaces`
        };
        if(username.replace(/[^0-9a-z]/g, "").length !== username.length){
            throw `username should only be a alpha numeric string`
        };
        if(username.length < 4){
            throw `length of username should atleast be 4 characters`
        };

        //error handling for password
        if(!password ){
            throw `please enter a password`
        };
        if(typeof password !== 'string'){
            throw `password must be a string`
        }
        if(!password.replace(/\s/g, "").length || password.indexOf(' ') >= 0){
            throw `password should not contain empty spaces`
        }
        if(password.length < 6){
            throw `password should be atleast 6 characters long`
        };
        
        const hash = await bcrypt.hash(password, saltRounds);

        let newUser = {
            name: name,
            username: username,
            password: hash
        };
        const userCollection = await users();
        let requiredUser = await userCollection.findOne({username: username});
        if(requiredUser !== null){
            throw `user already exists`
        }

        const insertUser = await userCollection.insertOne(newUser);
        if(insertUser.insertedCount === 0){
            throw `Could not insert the user`
        }
        requiredUser = await userCollection.findOne({username: username});
        return requiredUser;
    },

    async checkUser(username, password){
        username = username.toLowerCase();
         //error handling for username
         if(!username){
            throw `please enter a username`
        };
        if(typeof username !== 'string'){
            throw `username must be a string`
        };
        if(!username.replace(/\s/g, "").length || username.indexOf(' ') >= 0){
            throw `username cannot be empty spaces or contain empty spaces`
        };
        if(username.replace(/[^0-9a-z]/g, "").length !== username.length){
            throw `username should only be a alpha numeric string`
        };
        if(username.length < 4){
            throw `length of username should atleast be 4 characters`
        };
        //error handling for password
        if(!password ){
            throw `please enter a password`
        };
        if(typeof password !== 'string'){
            throw `password must be a string`
        }
        if(!password.replace(/\s/g, "").length || password.indexOf(' ') >= 0){
            throw `password should not contain empty spaces`
        }
        if(password.length < 6){
            throw `password should be atleast 6 characters long`
        };
        
        const userCollection = await users();

        let arrayOfUsers = [];
        arrayOfUsers = await userCollection.find({}).toArray();
        let count = 0;
        for (let i = 0; i < arrayOfUsers.length; i++){
            if(arrayOfUsers[i].username === username){
                count = 1;
                const compare = await bcrypt.compare(password, arrayOfUsers[i].password)
                if(compare){
                    return arrayOfUsers[i];
                }
                else{
                    throw `either username/password invalid`
                }
            }
        }
        if(count === 0){
            throw `invalid username/password`
        }
    }
}

module.exports = exportedMethods;