const ntf = require('./index');

const should = require('chai').should();

let res;

describe ('Test Integers to French Words', () => {
  it ('1 Digit', () => {
    res = ntf(4);
    res.should.be.a('string');
    res.should.equal('quatre');
  });
  it ('2 Digit', () => {
    res = ntf(87);
    res.should.be.a('string');
    res.should.equal('quatre-vingt sept');
  });
  it ('3 Digit', () => {
    res = ntf(978);
    res.should.be.a('string');
    res.should.equal('neuf cents soixante dix-huit');
  });
  it ('4 Digit', () => {
    res = ntf(1879);
    res.should.be.a('string');
    res.should.equal('mille huit cents soixante dix-neuf');
  });
  it ('5 Digit', () => {
    res = ntf(98653);
    res.should.be.a('string');
    res.should.equal('quatre-vingt dix-huit milles six cents cinquente trois');
  });
});

describe ('Test Floats to French Words', () => {
  it ('1 Digit after comma', () => {
    res = ntf(4.5);
    res.should.be.a('string');
    res.should.equal('quatre virgule cinq');
  });
  it ('2 Digits after comma', () => {
    res = ntf(87.31);
    res.should.be.a('string');
    res.should.equal('quatre-vingt sept virgule trente et un');
  });
  it ('2 Digits after comma last is 0', () => {
    res = ntf(71.50);
    res.should.be.a('string');
    res.should.equal('soixante et onze virgule cinq');
  });
});
