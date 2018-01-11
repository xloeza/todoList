var express = require('express');
var router = express.Router();
var _ = require('lodash')
var Todo = require('../models/todos.model.js');

/* GET todo listing. */
//key, text, completed, isEditable
router.get('/todos', function(req, res, next) {
  Todo.find(function(err, todos){
    if(err) {
      return res.status(500).json({error: err});
    } else {
        res.json({ data: todos });
    }
  });  
});

router.post('/todos', function (req, res, next) {  
  if(!req.body.newItem) {
    res.status(400).send({message: "Todo can not be empty"});
  }
  var params = _.pick(req.body.newItem, 'text', 'completed', 'key');

  var todo = new Todo({
    key: params.key,
    text: params.text, 
    completed: params.completed
  });

  todo.save(function(err, todos) {
      console.log(todos);
      if(err) {
          console.log(err);
          return res.status(500).json({error: err});
      } else {
        res.json({ data: todos });
      }
  });
  
})

module.exports = router;