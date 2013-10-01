var
  /* exported should */
  should = require('should'),
  example = require('./../index.js'),
  Kernel = require('kabam-kernel'),
  config = require('./config.json').development;


describe('kabam plugin example', function() {
  var kabam;

  before(function() {
    kabam = new Kernel(config);
    kabam.usePlugin(example);
    kabam.listen();
  });

  describe('#extendApp', function() {

    it('should set Var1 with the value \'42\'', function() {
      kabam.app.get('Var1').should.equal('42');
    });

  });

});
