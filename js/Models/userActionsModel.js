var databaseConnection = require('./databaseConnection.js');
var uuidV4 = require('uuid/v4');
var getUserActions = getCollectionByName('userActions');

// XXX Only for debugging
function log(x) {
  console.log(x);
  return x;
}

function logError(x) {
  console.error(x);
  return x;
}

// XXX CRUD operations
function getCollectionByName(name) {
  return function(db) {
    return new Promise(function(resolve, reject) {
      try {
        var collection = db.collection(name);
      } catch(e) {
        reject(e);
      }
      resolve(collection);
    });
  }
}

function getUserActionsByUserId(userId) {
  return databaseConnection.connect()
  .then(getUserActions)
  .then(function(collection) {
    console.log("lalalalla")
    return new Promise(function(resolve, reject) {
      collection.find({
        id: userId
      })
      .toArray(function(err, items) {
        if(err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  })
  .then(log)
  .catch(logError);
}

function updateUserActionsByUserId(userId, action) {
  return databaseConnection.connect()
  .then(getUserActions)
  .then(function(collection) {
    return new Promise(function(resolve, reject) {
      collection.update(
        { id: userId},
        {
          $push: { actions: action }
        },
        {},
        function(err, result) {
          if(err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      )
    });
  })
  .catch(logError);
}

// function getUserActionsFromDB() {
//   return databaseConnection.connect(getUserActions);
// }

function updateUserInfoById(userId, userData) {
  return databaseConnection.connect()
  .then(getUserActions)
  .then(function(collection) {
    return new Promise(function(resolve, reject) {
      collection.update(
        { id: userId},
        {
          $set: {
            age: userData.age,
            race: userData.race,
            gender: userData.gender
          }
        },
        {}, //options
        function(err, result) {
          if(err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  })
  .catch(logError);
}


/***
  * Adds new user action to existing user
  *
  */
function addUserAction(userId, action) {
  return databaseConnection.connect()
  .then(getUserActions)
  .then(function(collection) {
    return new Promise(function(resolve, reject) {
      collection.update(
        { id: userId},
        {
          $push: { actions: action }
        },
        {},
        function(err, result) {
          if(err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    })
  })
  .catch(logError);
}

function addUserToDatabase () {
  return new Promise(function(resolve, reject) {
    databaseConnection.connect()
    .then(getUserActions)
    .then(function(collection) {
      var generatedUserId = uuidV4();
      try {
        collection.insertOne({
          id: generatedUserId,
          age: null,
          race: null,
          gender: null,
          actions: []
        });
      } catch(e) {
        reject(e);
      }
      resolve(generatedUserId);
    });
  });
}

// function createCollection() {
//   databaseConnection.connect(function() {
//     db.createCollection("userActions", { size: 2000000 } );
//     db.close();
//   })
// }

function addDummyData() {
  return databaseConnection.connect()
  .then(getUserActions)
  .then(function(collection) {
    collection.insertOne( {
      id: uuidV4(),
      age: null,
      race: null,
      gender: null,
      actions: [
        {
          sceneName: "introScene",
          interactionType: "positive"
        }
      ]
    })
    .then(log)
    .catch(logError);
  })
  .catch(logError);
}

function getUserActionsTable() {
  return databaseConnection.connect()
  .then(getUserActions);
}

module.exports = {
  addDummyData: addDummyData,
  // getUserActionsFromDB: getUserActionsFromDB,
  getUserActionsByUserId: getUserActionsByUserId,
  updateUserInfoById: updateUserInfoById,
  // insertUserActions: insertUserActions,
  addUserActionForUserId: addUserAction,
  getUserActionsTable: getUserActionsTable,
  addUserToDatabase: addUserToDatabase
}
