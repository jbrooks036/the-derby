/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gambler    = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'gamblers';

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });


  describe('constructor', function(){
    it('should create a new Gambler object', function(){
      var o = new Gambler({name:'Bob Jones',
               'photo': 'http://www.panamahatmall.com/images/denew007_M.jpg',
               'spouse':{'name': 'Betty','photo': 'http://photofunia.com/img/script_images/516/large_icon.jpg'},
               'cash':12834.45,
               'assets':[{'name':'jet', 'photo':'http://www.orientskys.com/images/private-jet-Asia.jpg', 'value':500000},
               {'name':'summer cottage', 'photo':'http://www.photo-dictionary.com/photofiles/list/9452/12852summer_cottage.jpg', 'value':120000},
               {'name':'car', 'photo':'http://www.extremetech.com/wp-content/uploads/2012/12/Audi-A1.jpg', 'value':15000}],
               'results':{'wins':0, 'losses':0}
             });
      expect(o).to.be.instanceof(Gambler);

    });
  });

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gamblers){
        // console.log(gamblers);
        expect(gamblers).to.have.length(3);
        // expect(gamblers[0]).to.be.instanceof(Gambler);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a gambler by their id', function(done){
      Gambler.findById('000000000000000000000001', function(err, gambler){
        expect(gambler).to.be.instanceof(Gambler);
        expect(gambler.name).to.equal('Bob Jones');
        done();
      });
    });
  });

  describe('#removeAsset', function(){
    it('should remove an asset by name from gamblers assets', function(done){
      Gambler.findById('000000000000000000000002', function(err, gambler){
        gambler.removeAsset('ring');
        expect(gambler.cash).to.be.closeTo(17834.45, 1.0);
        expect(gambler.assets).to.have.length(2);
        done();
      });
    });
  });
});

