const path = require('path');

const rootDirPath = path.dirname(require.main.filename);

const productPath = path.join(rootDirPath, 'data', 'products.json');

const cartPath = path.join(rootDirPath, 'data', 'cart.json');

exports.productPath = productPath;

exports.cartPath = cartPath;