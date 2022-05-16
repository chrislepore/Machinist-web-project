const express = require('express');
const Part = require('../models/part');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const parts = await Part.getParts();
      res.send(parts);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/UserParts', async (req, res) => {
    try {
      const part = await Part.getUserParts(req.body); 
      res.send({...part});
    } catch (error) {
      res.status(401).send({message: error.message});
    }
  })

  .post('/createPart', async (req, res) => {
    try {
      const part = await Part.createPart(req.body); 
      res.send({...part});
    } catch (error) {
      res.status(401).send({message: error.message});
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      await Part.deletePart(req.body.partId);
      res.send({success: "bye part...:("});
    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  .put('/edit', async (req, res) => {
    try {
      const part = await Part.editPart(req.body);
      console.log(part)
      res.send({...part});
    } catch(error) {
      res.status(401).send({message: error.message})
    }
  })

module.exports = router;