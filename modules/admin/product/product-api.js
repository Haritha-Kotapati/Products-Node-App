const { ObjectId } = require("mongodb");

const dbConn = require("../../_db/db-connection");

const tableName = "products";

async function getProducts() {
    return await dbConn.findList(tableName);
}

async function addProduct(productObj) {
    await dbConn.insertData(tableName, productObj);
}

async function editProduct(id, productObj) {
    await dbConn.editData(tableName, id, productObj);
}

async function deleteProduct(id) {
    await dbConn.deleteData(tableName, id);
}

async function getSelectedProduct(id) {
    return await dbConn.getSingleData(tableName, id);
}

module.exports = {
    getProducts,
    addProduct,
    deleteProduct,
    editProduct,
    getSelectedProduct
};