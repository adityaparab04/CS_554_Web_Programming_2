const {ApolloServer, gql} = require('apollo-server');
const axios = require('axios');
const redis = require('redis');
const uuid = require('uuid');

//connection to redis
const client = redis.createClient();
async function connect(){
    return await client.connect();
}
connect();

//secret key
const client_id = 'XkByU2JpueIOb8HvkmpL6-9KWUNIc6bO-vs1T3V6wqU';
const baseUrl = 'https://api.unsplash.com/photos?client_id=' + client_id + '&page='

//Queries
const typeDefs = gql `
    type Query {
        unsplashImages(pageNum: Int): [ImagePost]
        binnedImages: [ImagePost]
        userPostedImages: [ImagePost]
        getTopTenBinnedPosts: [ImagePost]
    }
    type Mutation {
        uploadImage(url: String!, description: String, posterName: String): ImagePost
        updateImage(id: ID!, url: String, posterName: String, description: String, userPosted: Boolean, binned: Boolean, numBinned: Int): ImagePost
        deleteImage(id:ID!): ImagePost
    }
    type ImagePost {
        id: ID!
        url: String!
        posterName: String!
        description: String
        userPosted: Boolean!
        binned: Boolean!
        numBinned: Int
    }
`

async function fetchImages(pageNum){
    try{
        if(!pageNum){
            pageNum = 1;
        }
        const { data } = await axios.get(baseUrl + pageNum)
        const images = await data.map(async (img) => {
            const cacheImage = await client.GET(img.id);
            let binned = false
            if(cacheImage) {
                binned=true;
            }
            let image = {
                id: img.id,
                url: img.urls.full,
                description: img.description,
                posterName: img.user.name,
                userPosted: false,
                binned: binned,
                numBinned: img.likes
            }
            return image;
        });
        return images;       
    }catch(e){
        console.log(e);
    }
}

async function fetchBinnedImages(){
    let binned = await client.LRANGE("binned", 0, -1);
    try{
        let images = [];
        for(const image of binned){
            let img = await client.GET(image);
            let imgObject = JSON.parse(img);
            if(imgObject!==null){
                if(imgObject.binned === true){
                    images.push(imgObject);
                }
            }
        }
        return images;
    }catch(e){
        console.log(e);
    }
}

async function fetchUserPostedImages(){
    let userPosted = await client.LRANGE("userposted", 0, -1);
    try{
        let images = [];
        for(const image of userPosted){
            let img = await client.GET(image);
            let imgObject = JSON.parse(img);
            if(imgObject.userPosted === true){
                if(imgObject.userPosted){
                    images.push(imgObject);
                }
            }
        }
        return images;
    }catch(e){
        console.log(e);
    }
}

async function fetchTopTenBinnedPosts(){
    try{
        let binImageList = await fetchBinnedImages();
        let popularBinList = [];
        // console.log(binImageList);
        for(const binImage of binImageList){
            // console.log(binImage)
            // await client.zAdd( "topImages", binImage.numBinned.toString(), JSON.stringify(binImage));
            await client.ZADD("topImages", {
                score: binImage.numBinned.toString(),
                value: JSON.stringify(binImage),
            });
        }
        let topTenImages = await client.sendCommand(["ZRANGE", "topImages", 0, 9, "rev"]);
        // console.log(topTenImages);
        await client.DEL("topImages");
        
        for(const image of topTenImages){
            imageObj = JSON.parse(image);
            popularBinList.push(imageObj);
        }
        return popularBinList;
    }catch(e){
        console.log(e);
    }
    
}

const resolvers = {
    Query:{
        unsplashImages: (_, args) => fetchImages(args.pageNum),
        binnedImages: () => fetchBinnedImages(),
        userPostedImages: () => fetchUserPostedImages(),
        getTopTenBinnedPosts: () => fetchTopTenBinnedPosts()
    },
    Mutation:{
        // upload image
        uploadImage: async (_, args) => {
            if(!args.url || typeof args.url !== 'string'){
                throw `You must provide url which should be string`
            };
            if(!args.description || typeof args.description !== 'string'){
                throw `You must provide a description which should be as a string`
            }
            if(!args.posterName || typeof args.posterName !== 'string'){
                throw `You must provide a posterName of string type`
            }
            try{
                const imageData = {
                    id:  uuid.v4(),
                    url: args.url,
                    description: args.description,
                    posterName: args.posterName,
                    userPosted: true,
                    binned: false,
                    numBinned: 0
                };
                await client.SET(imageData.id, JSON.stringify(imageData));
                await client.RPUSH('userposted', imageData.id);
                return imageData;
            }catch(e){
                console.log(e);
            }
        },
        //update image
        updateImage: async (_, args) => {
            try{
                let updatedImageData = {
                    id: args.id,
                    url: args.url,
                    posterName: args.posterName,
                    description: args.description,
                    userPosted: args.userPosted,
                    binned: args.binned,
                    numBinned: args.numBinned
                }
                let cacheData = JSON.parse(await client.GET(args.id));
                
                //logic for binning the image
                if(args.binned === true && !cacheData && args.userPosted === false){
                    await client.SET(args.id, JSON.stringify(updatedImageData));
                    await client.RPUSH('binned', args.id);
                }else if(args.binned === false && args.userPosted === false){
                    await client.LREM('binned', 0, args.id);
                    await client.DEL(args.id);
                }else if(args.binned === true && args.userPosted === true){
                    await client.SET(args.id, JSON.stringify(updatedImageData));
                    await client.RPUSH('binned', args.id);
                }else if(args.binned === false && args.userPosted === true){
                    await client.LREM('binned', 0, args.id);
                    await client.SET(args.id, JSON.stringify(updatedImageData));
                }
                return updatedImageData;
            }catch(e){
                console.log(e);
            }
        },
        //delete image
        deleteImage: async (_, args) => {
            if(!args.id) {
                throw `ERROR: please provide an id`
            }
            try{
                let cacheData = JSON.parse(await client.GET(args.id));
                await client.LREM('userposted', 0, args.id);
                await client.LREM('binned', 0, args.id);
                return cacheData;
            }catch(e){
                console.log(e);
            }
        }
    }
}

//apollo server config
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url} 🚀`);
});