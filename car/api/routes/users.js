const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');    

router.post('/signup', UsersController.userNew);

router.post('/login', UsersController.userLog);

router.delete('/:u_id', UsersController.userRemove);

router.patch('/:u_id', UsersController.userEdit);

router.get('/',UsersController.userAll);

module.exports = router;
