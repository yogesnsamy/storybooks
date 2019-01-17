const express = require('express');
const router = express.Router();
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const watson = require('../config/watson');

const discovery = new DiscoveryV1({
  version: watson.version,
  iam_apikey: watson.iam_apikey,
  url: watson.url
});

router.get('/search', (req, res) => {
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

  //-----------------from sample
  // discovery.query({environment_id: params.environment_id,
  //   collection_id: params.collection_id,
  //   query: req.body.question
  // },
  //----------------end of sample
  discovery.query(
    {
      environment_id: params.environment_id,
      collection_id: params.collection_id,
      query: req.body.question
    },
    (error, data) => {
      if (error) {
        next(error);
      } else {
        var i = 0;
        var discoveryResults = [];
        while (data.results[i] && i < 5) {
          let body = data.results[i].answer;
          discoveryResults[i] = {
            body: body,
            bodySnippet: (body.length < 144
              ? body
              : body.substring(0, 144) + '...'
            ).replace(/<\/?[a-zA-Z]+>/g, ''),
            confidence: data.results[i].score,
            id: data.results[i].id,
            sourceUrl: data.results[i].sourceUrl,
            title: data.results[i].title,
            question: data.results[i].question
          };
          i++;
        }
        // console.log(data.session_token);
        // console.log(data.results);
        // var i = 0;
        // var discoveryResults = [];
        // while (data.results[i] && i < 3) {
        //   console.log(data.results[i].id);
        //   console.log(data.results[i].question);
        //   console.log(data.results[i].answer);
        //   i++;
        // }
        // console.log(data.results[1].question);

        // var i = 0;
        // var discoveryResults = [];
        // while (data.results[i] && i < 3) {
        //   // let body = data.results[i].contentHtml;
        //   discoveryResults[i] = {
        //     question: data.results[i].question,
        //     // answerSnippet: (data.results[i].answer.length < 144
        //     //   ? data.results[i].answer
        //     //   : data.results[i].answer.substring(0, 144) + '...'
        //     // ).replace(/<\/?[a-zA-Z]+>/g, ''),
        //     confidence: data.results[i].score,
        //     id: data.results[i].id,
        //     sourceUrl: data.results[i].sourceUrl,
        //     answer: data.results[i].answer
        //   };
        //   i++;
        // }
        // // console.log('go to rfp/index');
        // // res.render('rfps/index', {
        res.render('rfps/results', {
          title: query,
          question: query,
          discoveryResults: discoveryResults
        });
      }
    }
  );
});

module.exports = router;
