var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );

/* GET home page. */
router.get('/', function(req, res, next) {
  Todo.find( function ( err, todos, count ){
    res.render( 'index', {
      title : 'Express Todo Example',
      todos : todos
    });
  });
});

router.post('/create', function(req, res, next){
  new Todo({
    content    : req.body.content,
    updated_at : Date.now()
  }).save( function( err, todo, count ){
        res.redirect( '/' );
      });
});

router.get('/delete/:id', function(req, res, next){
  Todo.findById( req.params.id, function ( err, todo ){
    todo.remove( function ( err, todo ){
      res.redirect( '/' );
    });
  });
});

router.get('/edit/:id', function(req, res, next){
  Todo.find( function ( err, todos ){
    res.render( 'edit', {
      title   : 'Express Todo Example',
      todos   : todos,
      current : req.params.id
    });
  });
});

router.post('/update/:id', function(req, res, next){
  Todo.findById( req.params.id, function ( err, todo ){
    todo.content    = req.body.content;
    todo.updated_at = Date.now();
    todo.save( function ( err, todo, count ){
      res.redirect( '/' );
    });
  });
});
module.exports = router;
