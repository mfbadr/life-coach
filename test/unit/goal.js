/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Goal    = require('../../app/models/goal'),
    dbConnect = require('../../app/lib/mongodb'),
    //cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'life-coach-test';

describe('Goal', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });
  beforeEach(function(done){
    done();
  });
  describe('.create', function(){
    it('should create and save a new goal', function(done){
      var body   = {name:'be a doctor', due:'2014-06-02', tags:'a,b,x,d'},
          userId = Mongo.ObjectID('000000000000000000000001');
      Goal.create(body, userId, function(err, goal){
        expect(goal).to.be.instanceof(Goal);
        expect(goal._id).to.be.instanceof(Mongo.ObjectID);
        expect(goal.userId).to.be.instanceof(Mongo.ObjectID);
        expect(goal.name).to.equal('be a doctor');
        expect(goal.due).to.be.instanceof(Date);
        expect(goal.tags).to.have.length(4);
        done();
      });
    });
  });
});

