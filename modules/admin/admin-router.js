const express = require("express");
const adminRouter = express.Router();

const productRouter = require("./product/product-router");
const productModel = require("./../admin/product/product-api");

adminRouter.use("/product", productRouter);



adminRouter.get("/", async (request, response) => {
    let products = await productModel.getProducts();
    response.render("admin", {
        title: "Welcome Admin",
        products: products
    });
});

module.exports = adminRouter;