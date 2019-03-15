const uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();

function tooShort(name) {
  return !name || name.length < 3;
}

var users = {};
for(var i = 0; i < 10; i++){
  var userId = uuidv4();
  users[userId] = {
    id: userId,
    name: userId + ' Name'
  }
}

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.json(Object.values(users));
});

router.get('/user/:id', function(req, res, next) {
  var id = req.params.id;
  if (users[id]) {
    res.json(users[id]);
  } else {
    res.status(404).send('user ' + id + ' does not exist');
  }
});

router.post('/user', function(req, res, next) {
  var newUser = req.body;
  var newUserId = newUser.id;
  if (users[newUserId]) {
    res.status(400).send('user ' + newUserId + ' already exists');
  } else if(tooShort(newUser.name)) {
    res.status(400).send('name ' + newUser.name + ' is too short');
  } else {
    users[newUser.id] = newUser;
    res.json(users[newUser.id]);
  }
});

router.put('/user', function(req, res, next) {
  var newUser = req.body;
  var newUserId = newUser.id;
  if (!users[newUserId]) {
    res.status(400).send('user ' + newUserId + ' does not exist');
  } else if(tooShort(newUser.name)) {
    res.status(400).send('name ' + newUser.name + ' is too short');
  } else {
    users[newUser.id] = newUser;
    res.json(users[newUser.id]);
  }
});

router.delete('/user/:id', function(req, res, next) {
  var id = req.params.id;
  delete users[id];
  res.status(200).send('user ' + id + ' successfully deleted');
});

module.exports = router;
