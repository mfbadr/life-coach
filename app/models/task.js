'use strict';


function Task(o){
  this.name = o.name;
  this.difficulty = o.difficulty;
  this.description = o.description;
  this.rank = o.rank * 1;
  this.isComplete = false;
}

module.exports = Task;

