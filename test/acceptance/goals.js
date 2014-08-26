/* global describe, beforeEach, before, it */
'use strict';

process.env.DB = 'life-coach-test';

var expect  = require('chai').expect,
    cp      = require('child_process'),
    request = require('supertest'),
    app     = require('../../app/index');

describe('goals', function(){
  before(function(done){
    request(app).get('/').end(done);
  });
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', process.env.DB, {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });
  describe('get /', function(done){
    it('should fetch the home page', function(done){
      request(app)
      .get('/')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Home');
        done();
      });
    });
  });
  describe('get /goals/new', function(){
    it('should fetch the new goal page', function(done){
      request(app)
      .get('/goals/new')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Name');
        expect(res.text).to.include('Due');
        expect(res.text).to.include('Tags');
      });
    });
  });
});
