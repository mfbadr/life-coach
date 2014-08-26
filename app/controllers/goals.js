'use strict';

var Goal = require('../models/goal');

exports.init = function(req, res){
  res.render('goals/new');
};

exports.create = function(req, res){
  Goal.create(req.body, res.locals.user._id, function(){
    res.redirect('/goals');
  });
};

exports.index = function(req,res){
  Goal.findAllByUserId(res.locals.user._id, function(err, goals){
    res.render('goals/index', {goals:goals});
  });
};

exports.show = function(req, res){
  Goal.findById(req.params.id, function(goal){
    if(goal.userId.toString() === res.locals.user._id.toString()){
      res.render('goals/show', {goal:goal});
    }else{
      res.redirect('/goals');
    }
  });
};

exports.addTask = function(req, res){
  Goal.findById(req.params.id, function(goal){
    goal.addTask(req.body, function(){
      res.redirect('/goals/' + req.params.id);
    });
  });
};
