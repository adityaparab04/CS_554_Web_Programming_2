const dbConnection = require('./mongoConnection');

const getCollectionFunc = (collection) => {
    let _col = undefined;
  
    return async () => {
      if (!_col) {
        const db = await dbConnection.connectToDb();
        _col = await db.collection(collection);
      }
  
      return _col;
    };
};

module.exports = {
    blogs: getCollectionFunc('blogs'),
    users: getCollectionFunc('users')
};