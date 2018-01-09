var express = require('express');
var router = express.Router();

/* GET todo listing. */
//key, text, completed, isEditable
router.get('/todos', function(req, res, next) {
  res.json([{
  	key: 1,
    text: "Todo 01",
    completed : false,
    isEditable : false
  }, 
  {
    key: 2,
    text: "Todo 02",
    completed : false,
    isEditable : false
  }]);
});

module.exports = router;