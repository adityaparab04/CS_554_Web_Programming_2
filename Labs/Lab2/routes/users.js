const express = require('express');
const router = express.Router();
const data = require('../data');
const redis = require('redis');
const bluebird = require("bluebird");

const client = redis.createClient();
client.flushdb((err, succeeded) => {
    if(err){
        console.log(err);
    }else{
        console.log(`Cache cleared successfully`);
    }
});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/history", async (req, res) => {
    try {
        let history = await client.LRANGEAsync("history", 0, 19);
        if(await client.LLENAsync("history") === 0){
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
        let checkUser = await client.HEXISTSAsync("userCache", req.params.id);
        if(checkUser === 1){
            const user = await client.HMGETAsync("userCache", req.params.id);
            await client.LPUSHAsync("history", user);
            res.json(JSON.parse(user));
        }else{
            const UserData = await data.getById(req.params.id);
            await client.HSETAsync("userCache", req.params.id, JSON.stringify(UserData));
            await client.LPUSHAsync("history", JSON.stringify(UserData));
            res.json(UserData);
        }
    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = router;
