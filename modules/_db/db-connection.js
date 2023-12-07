const { MongoClient, ObjectId } = require("mongodb");

const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;
//mongodb+srv://admin:<password>@cluster0.6yfxmmq.mongodb.net/
const client = new MongoClient(dbURL);

//MONGODB HELPER FUNCTIONS
async function connection() {
    try {
        db = client.db(`${process.env.DB_NAME}`);
        return db;
    } catch(error) {
        console.error('Failed to connect to the MongoDB database: ', error);
    }
}

async function findList(collectionName) {
    try {
        db = await connection();
        return db.collection(collectionName).find({}).toArray();
    } catch(error) {
        console.log('Failed to fetch list details: ', error);
    }
}

async function insertData(collectionName, newObject) {
    try {
        db = await connection();
        let result = await db.collection(collectionName).insertOne(newObject);
        if (result.insertedId) {
            console.log(`Data added in ${collectionName}`);
        }
    } catch(error) {
        console.log(`Failed to data add in ${collectionName}: `, error);
    }
}

async function editData(collectionName, id, updatedObj) {
    try {
        db = await connection();
        let editFilter = { _id: new ObjectId(id) };
        let result = await db.collection(collectionName).updateOne(editFilter, { $set: updatedObj });
        if (result.modifiedCount === 1) {
            console.log(`Data updated in ${collectionName}`);
        }
    } catch(error) {
        console.log(`Failed to data update in ${collectionName}: `, error);
    }
}

async function deleteData(collectionName, id) {
    try {
        db = await connection();
        let deleteFilter = { _id: new ObjectId(id) };
        let result = await db.collection(collectionName).deleteOne(deleteFilter);
        if (result.deletedCount == 1) {
            console.log(`Data deleted in ${collectionName}`);
        }
    } catch (error) {
        console.log(`Failed to data delete in ${collectionName}: `, error);
    }
}
  
/* Async function to select one document by _id. */
async function getSingleData(collectionName, id) {
    try {
        db = await connection();
        const idFilter = { _id: new ObjectId(id) };
        return db.collection(collectionName).findOne(idFilter);
    } catch(error) {
        console.log(`Failed to fetch data from ${collectionName}: `, error);
    }    
}



module.exports = {
    findList,
    deleteData,
    getSingleData,
    insertData,
    editData
};