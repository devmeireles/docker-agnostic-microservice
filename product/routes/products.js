var express = require('express');
var router = express.Router();
var typeorm = require("typeorm");
var productEntity = require("../entity/product");

var dataSource = new typeorm.DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "msdatabase",
  entities: [productEntity],
});

router.get('/', async (req, res, next) => {

  const dbConn = await dataSource.initialize();
  const productRepository = await dbConn.getRepository('Product');
  const products = await productRepository.find();

  res.status(201).json({
    success: true,
    data: [
      products
    ],
  });
});

module.exports = router;
