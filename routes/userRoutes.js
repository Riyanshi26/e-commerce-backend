const express = require('express');
const router = express.Router();
const { addUser, authUser } = require("../controllers/userControllers");
const { createCat,deleteCategory} = require("../controllers/categoryControllers");
const { createProduct, deleteCartProduct,addCart,deleteProduct,updateProduct} = require("../controllers/productControllers");
const Authenticate = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/isAdmin");
const { addOrder, delivered } = require('../controllers/orderController');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const postAuthenticate = require('../middlewares/postAuthenticate');
const Order = require('../models/orderModel');
const AuthAdmin = require('../middlewares/authAdmin');

router.route('/signup').post(addUser);
router.route('/login').post(authUser);
router.route('/category/create').post(isAdmin, createCat);
router.route('/product/create').post(isAdmin, createProduct);
router.route('/order/addorder').post(postAuthenticate, addOrder);
router.route('/product/cart').post(postAuthenticate, addCart);

router.route('/cart/product/delete').post(postAuthenticate, deleteCartProduct);
router.route('/product/delete').post(isAdmin, deleteProduct);
router.route('/product/update').post(isAdmin, updateProduct);
router.route('/category/delete').post(isAdmin, deleteCategory);
router.route('/order/delivered').post(delivered);

router.get("/aboutuser", Authenticate, (req, res) => {
  res.send(req.rootUser);
  
});
router.get("/authadmin", AuthAdmin, (req, res) => {
  res.send(req.rootUser);
  
});
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken");
  res.status(200).send('user logout');
});
router.get('/shop', async (req, res, next) => {
  try {
    const allProduct = await Product.find();

    return res.status(200).json({
      success: true,
      count: allProduct.length,
      data: allProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'all products cannot be fetched' });
  }
});
router.get('/shopcategory', async (req, res, next) => {
  try {
    const allCategory = await Category.find();

    return res.status(200).json({
      success: true,
      count: allCategory.length,
      data: allCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'all categories cannot be fetched' });
  }
});
router.get('/vieworders', async (req, res, next) => {
  try {
    const allOrders = await Order.find();

    return res.status(200).json({
      success: true,
      count: allOrders.length,
      data: allOrders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'all orders cannot be fetched' });
  }
});

//?id=${productId}
router.get("/product/products_by_id", async (req, res, next) => {


  try {
    let productId = (req.query.id);

    const foundProduct=await Product.find({ _id: productId });

    return res.status(200).json({
      success: true,
      count: foundProduct.length,
      data: foundProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'the product cannot be fetched' });
  }
})



module.exports = router;