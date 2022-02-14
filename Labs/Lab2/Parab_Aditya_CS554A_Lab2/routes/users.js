const express = require('express');
const router = express.Router();
const data = require('../data');
const redis = require('redis');
const client = redis.createClient();

//connection to redis
async function connect(){
    return await client.connect();
}
connect();

router.get("/history", async (req, res) => {
    try {
        let history = await client.lRange("history", 0, 19);
        if(await client.lLen("history") === 0){
            res.status(404).json({E: "No visitors yet"});
            return;
        }else{
            res.json(history.map(JSON.parse));
            return;
        }
    } catch (e) {
        console.log(e);
        res.status(404).send(e);
    }
});

router.get("/:id", async (req, res) => {
    try {
        if(isNaN(req.params.id)){
            res.status(400).json({e: 'not a valid id type'});
            return;
        }
        let checkUser = await client.hExists("userCache", req.params.id);
        if(checkUser){
            const user = await client.hmGet("userCache", req.params.id);
            await client.lPush("history", user);
            res.json(JSON.parse(user));
        }else{
            const UserData = await data.getById(req.params.id);
            await client.lPush("history", JSON.stringify(UserData));
            await client.hSet("userCache", req.params.id, JSON.stringify(UserData));
            res.json(UserData);
        }
    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = router;
