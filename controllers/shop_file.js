const Product = require('../models/product');
const Cart = require('../models/cart');

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('shop/product-list', {
//       prods: products,
//       pageTitle: 'All Products',
//       path: '/products'
//     });
//   });
// };

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([result, field]) => {
    res.render('shop/product-list', {
      prods: result,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch( err => {
    console.log(err);
  });
};

exports.getProduct = (req, res, next) => {
  const prod = req.params.productId;
  Product.getProductByID(prod, product =>{
    //console.log(product);
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([result, field]) => {
    res.render('shop/index', {
      prods: result,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch( err => {
    console.log(err);
  });

};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const prod = req.body.productID;
  Product.getProductByID(prod, product =>{
    Cart.addToCart(prod, product.price);
    res.redirect('/');
  });

  
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
