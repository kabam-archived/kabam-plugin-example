var should = require('should'),
  example = require('./../index.js'),
  mwcCore = require('mwc_core'),
  config = require('./config.json').development;


describe('mwc plugin example', function() {
  var MWC;

  before(function() {
    MWC = new mwcCore(config);
    MWC.usePlugin(example);
    MWC.listen();
  });

  describe('#setAppParameters', function() {

    it('should set Var1 with the value \'42\'', function() {
      MWC.app.get('Var1').should.equal('42');
    });

  });

});
