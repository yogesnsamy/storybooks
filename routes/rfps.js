const express = require('express');
const router = express.Router();
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const watson = require('../config/watson');

const discovery = new DiscoveryV1({
  version: watson.version,
  iam_apikey: watson.iam_apikey,
  url: watson.url
});

router.get('/', (req, res) => {
  res.render('rfps/search');
});

router.post('/', (req, res) => {
  const query = req.body.question;
  const params = {
    query: query,
    environment_id: watson.environment_id,
    collection_id: watson.collection_id,
    configuration_id: watson.configuration_id,
    passages: watson.passages,
    return: watson.return,
    highlight: watson.highlight
  };

  discovery.query(params, (error, data) => {
    if (error) {
      next(error);
    } else {
      console.log('go to rfp/index');
      // res.render('rfps/index', {
      res.render('rfps/search', {
        title: query,
        question: query,
        data: data
      });
    }
  });
});

module.exports = router;
