'use strict';
module.exports = function(app) {
  var productsCtrl = require('./controllers/ProductsController');

  // todoList Routes
  app.route('/users')
    .get(productsCtrl.get)
    .post(productsCtrl.store);


  app.route('/users/:productId')
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);
};
