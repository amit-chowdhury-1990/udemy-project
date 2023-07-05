const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

// exports.getEditProduct = (req, res, next) => {
//   const prod = req.params.productId;
//   Product.getProductByID(prod, product =>{
//     res.render('admin/edit-product', {
//       pageTitle: 'Edit Product '+product.title,
//       path: '/admin/add-product',
//       product: product,
//       formsCSS: true,
//       productCSS: true,
//       activeAddProduct: true
//     });
//   });
  
// };

exports.getEditProduct = (req, res, next) => {
  const prod = req.params.productId;
  Product.getProductByID(prod)
  .then(([result]) =>{
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/add-product',
      product: result[0],
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  })
  .catch(err =>{
    console.log(err);
  })
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.postEditProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const prodId = req.body.productId
  const product = new Product(title, imageUrl, description, price);
  product.editProductByID(prodId);
  res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.postDeleteProduct(prodId);
  res.redirect('/admin/products');
};


// exports.getProducts = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('admin/products', {
//       prods: products,
//       pageTitle: 'Admin Products',
//       path: '/admin/products'
//     });
//   });
// };

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([result, field]) => {
    res.render('admin/products', {
      prods: result,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch( err => {
    console.log(err);
  });
};
