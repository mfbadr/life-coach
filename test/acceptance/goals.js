/* global describe, beforeEach, before, it */
'use strict';

process.env.DB = 'life-coach-test';

var expect  = require('chai').expect,
    cp      = require('child_process'),
    request = require('supertest'),
    cookie  = null,
    app     = require('../../app/index');

describe('goals', function(){
  before(function(done){
    //make sure server is running
    request(app).get('/').end(done);
  });
  beforeEach(function(done){
    //import users
    cp.execFile(__dirname + '/../scripts/clean-db.sh', process.env.DB, {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      request(app)
      .post('/login')
      .send('email=bob@email.com')
      .send('password=a')
      .end(function(err, res){
        cookie = res.headers['set-cookie'][0]; //get cookie and save it off
        done();
      });
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
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Name');
        expect(res.text).to.include('Due');
        expect(res.text).to.include('Tags');
        done();
      });
    });
  });
  describe('post /goals', function(){
    it('should create a new goal and  redirect to /goals', function(){
      request(app)
      .post('/goals')
      .set('cookie', cookie)
      .send('name=be+a+doctor&due=2014-08-28&tags=a%2Cb%2Cc%2Cd') //copy from browser
      .end(function(err, res){
        expect(res.status).to.equal(302);
      });
    });
  });
  describe('get /goals', function(){
    it('should show the goals page', function(){
      request(app)
      .get('/goals')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('doctor');
        expect(res.text).to.include('marathon');
      });
    });
  });
  describe('get /goals/3', function(){
    it('should show a specific goal page', function(){
      request(app)
      .get('/goals/a00000000000000000000001')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('doctor');
      });
    });
    it('should not show goal if from a different user', function(){
      request(app)
      .get('/goals/a00000000000000000000003')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(302);
      });
    });
  });
});
