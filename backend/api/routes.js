'use strict';
module.exports = function(app) {
  var productsCtrl = require('./controllers/ProductsController');
  var adminCtrl = require('./controllers/AdminController');

  // user
  app.route('/users')
    .get(productsCtrl.get)
    .post(productsCtrl.store);


  app.route('/users/:productId')
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);

  // admin
  app.route('/admin')
    .get(adminCtrl.get)
    .post(adminCtrl.auth);

};
