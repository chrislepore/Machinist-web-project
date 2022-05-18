const express = require('express');
const Payment = require('../models/payment');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const payments = await Payment.getPayments();
      res.send(payments);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/createPayment', async (req, res) => {
    try {
      const payment = await Payment.createPayment(req.body); 
      res.send({...payment});
    } catch (error) {
      res.status(401).send({message: error.message});
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      await Payment.deletePayment(req.body.PaymentId);
      res.send({success: "bye payment...:("});
    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  .put('/edit', async (req, res) => {
    try {
      const payment = await Payment.editPayment(req.body);
      console.log(payment)
      res.send({...payment});
    } catch(error) {
      res.status(401).send({message: error.message})
    }
  })

module.exports = router;