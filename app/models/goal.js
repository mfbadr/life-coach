'use strict';

var Mongo = require('mongodb');

function Goal(o, userId){
  this.name = o.name;
  this.due = new Date(o.due);
  this.tags = o.tags.split(',');
  this.userId = userId;
}

Object.defineProperty(Goal, 'collection', {
  get: function(){return global.mongodb.collection('goals');}
});

Goal.create = function(o, userId, cb){
  var goal = new Goal(o, userId);
  Goal.collection.save(goal, cb);
};

Goal.all = function(cb){
  Goal.collection.find().toArray(cb);
};

Goal.findAllByUserId = function(userId, cb){
  Goal.collection.find({userId:userId}).toArray(function(err, goals){
    cb(null, goals);
  });
};

Goal.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Goal.collection.findOne({_id:id}, function(err, goal){
    cb(goal);
  });
};

module.exports = Goal;

