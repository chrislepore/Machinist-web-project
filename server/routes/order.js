const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const orders = await Order.getOrders();
      res.send(orders);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/userOrders', async (req, res) => {
    try {
      const order = await Order.getUserOrders(req.body.userId); 
      res.send({...order});
    } catch (error) {
      res.status(401).send({message: error.message});
    }
  })

  .post('/createOrder', async (req, res) => {
    try {
      const order = await Order.createOrder(req.body); 
      res.send({...order});
    } catch (error) {
      res.status(401).send({message: error.message});
    }
  })

  .put('/edit', async (req, res) => {
    try {
      const order = await Order.editOrder(req.body);
      console.log(order)
      res.send({...order});
    } catch(error) {
      res.status(401).send({message: error.message})
    }
  })

module.exports = router;