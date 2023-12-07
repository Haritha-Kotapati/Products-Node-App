const express = require("express");
const pageRouter = express.Router();

const productModel = require("./../admin/product/product-api");

pageRouter.get("/", async (request, response) => {
    let products = await productModel.getProducts();
    response.render("app/index", { 
        title: "DC's Sports Center",
        products: products
    });
});



module.exports = pageRouter;