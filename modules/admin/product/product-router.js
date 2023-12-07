const express = require("express");
const productRouter = express.Router();

const productModel = require("./product-api");

productRouter.use(express.urlencoded({ extended: true }));
productRouter.use(express.json());

productRouter.get("/", async (request, response) => {
    let products = await productModel.getProducts();
    response.render("admin/product/list-product", { 
        title: "Products List", 
        products: products
    });
});

productRouter.get("/add", async (request, response) => {
    response.render("admin/product/add-product", { title: "Add Product" });
});

productRouter.get("/edit", async (request, response) => {
    let selectedProduct = await productModel.getSelectedProduct(request.query.id);
    response.render("admin/product/edit-product", { title: "Edit Product", selectedProduct: selectedProduct });
});

productRouter.get("/delete", async (request, response) => {
    let id = request.query.id;
    await productModel.deleteProduct(id);
    response.redirect("/admin/product");
});

productRouter.post("/add/submit", async (request, response) => {
    let newProduct = {
        name: request.body.name,
        price: request.body.price,
        image: request.body.image
    };
    await productModel.addProduct(newProduct);
    response.redirect("/admin/product");
});

productRouter.post("/edit/submit", async (request, response) => {
    let id = request.body.id;
    let productObj = {
        name: request.body.name,
        price: request.body.price,
        image: request.body.image
    };
    await productModel.editProduct(id, productObj);
    response.redirect("/admin/product");
});

module.exports = productRouter;