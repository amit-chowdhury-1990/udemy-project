const fs = require('fs');
const path = require('../util/path');

const p = path.productPath

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  editProductByID(productID){
    getProductsFromFile(products =>{
      this.id = productID;
      const findProductindex = products.findIndex( prod => prod.id === productID);
      const updatedProduct = [...products];
      updatedProduct[findProductindex] = this;
      
      fs.writeFile(p, JSON.stringify(updatedProduct), err => {
        console.log(err);
      });
    });
  }

  static postDeleteProduct(productID){
    getProductsFromFile(products =>{
      const findProductindex = products.findIndex( prod => prod.id === productID);

      products.splice(findProductindex, 1);
      
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static getProductByID(productID, cb){
    getProductsFromFile(products =>{
      const product = products.find( p => p.id === productID);
      cb(product);
    });
  }

};
