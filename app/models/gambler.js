'use strict';

var Mongo   = require('mongodb'),
    _       = require('lodash');

function Gambler(o){
  this.name    = o.name;
  this.photo   = o.photo;
  this.spouse  = o.spouse;
  this.cash    = o.cash;
  this.assets  = o.assets;
  this.results = o.results;
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.all = function(cb){
  console.log('in Gambler.all-1');
  Gambler.collection.find().toArray(cb);
};

Gambler.findById = function(id, cb, isFull){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:_id}, function(err, obj){
    var gambler = _.create(Gambler.prototype, obj);
    if(!isFull){cb(err, gambler);return;}
  });
};

Gambler.prototype.removeAsset = function(aName){
  var soldAsset = _.remove(this.assets, function(asset){return asset.name === aName;});
  this.cash += soldAsset[0].value;
};

module.exports = Gambler;
