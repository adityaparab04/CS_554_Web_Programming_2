const axios = require('axios');

async function getData(){
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/ed50954f42c3e620f7c294cf9fe772e8/raw/925e36aa8e3d60fef4b3a9d8a16bae503fe7dd82/lab2");
    return data;
}
async function getById(id){
    id = parseInt(id);
    let peopleData = await getData();
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            let user;
            peopleData.forEach(person => {
                if(person.id === id){
                    user = person;
                }
            });
            if(user){
                resolve(user);
            }else{
                reject({Error: `User with id ${id} not found`})
            }
        }, 5000);
    })
}

module.exports = {
    getById
}


