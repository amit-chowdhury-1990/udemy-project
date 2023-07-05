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

exports.getEditProduct = (req, res, next) => {
  const prod = req.params.productId;
  Product.findByPk(prod)
  .then((result) =>{
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/add-product',
      product: result,
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

  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
  .then(()=>{
    res.redirect('/');
  })
  .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const prodId = req.body.productId
  Product.findByPk(prodId)
  .then((product) =>{
    product.title = title;
    product.price = price;
    product.description = description;
    product.imageUrl = imageUrl;
    return product.save();
    
  })
  .then(result =>{
    res.redirect('/admin/products');
  })
  .catch(err =>{
    console.log(err);
  })
  
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  // Product.destroy({
  //   where:{
  //     id: prodId
  //   }
  // })
  // .then(result =>{
  //   res.redirect('/admin/products');
  // })
  // .catch(err => console.log(err));

  Product.findByPk(prodId)
  .then(result =>{
    return result.destroy();

  })
  .then(re =>{
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then((result) => {
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
