var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var urlSchema = mongoose.Schema({
    // id: //auto increment
    url: String,
    base_url: String,
    code: String,
    title: String,
    visits: Number
  });

var Link = mongoose.model('Link', urlSchema);

var createSha = function(url){
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0,5);
}

urlSchema.pre('save', function(next){
  var code = createSha(this.url);
  this.code = code;
  next();
});

module.exports = Link;
