'use strict';
require('../declarations');
const expect = require('chai').expect;
const User = require('../../models/user.model');
const UserModel = require('mongoose').model('User');
const JWT = require('../../helpers/jwt.helper');
let UserJwt;
var SavedUserToken;
describe('UserModel', function () {
  describe('#update(_id, name, mobile, address, city, department, country, password)', function () {
    beforeEach(function* () {
      let jwt = yield User.signup('Test User', 'testuser@mytest.com', '12345678', '123456789123', 'cr 5 # 12313 123 sur', '05129', '574', '57', 'local');
      UserJwt = JWT.verify(jwt).data;
      return;
    });
    afterEach(function (done) {
      UserModel.remove({
        email: 'testuser@mytest.com'
      }, done, done);
    });
    it('should edit and user name without password', function* () {
      let userUpdated = yield User.update(UserJwt.id, 'pedro');
      return expect(userUpdated.id).to.be.equal(UserJwt._id);
    });
    it('should edit and user without password', function* () {
      let userUpdated = yield User.update(UserJwt.id, 'pedro', '1233412', 'other address', '05001', '574', '57');
      return expect(userUpdated.id).to.be.equal(UserJwt._id);
    });
    it('should edit and user passing the password', function* () {
      let userUpdated = yield User.update(UserJwt.id, 'pedro', '1233412', 'other address', '05001', '574', '57', '98765432');
      let jwt = yield User.login('testuser@mytest.com', '98765432');
      let validate = JWT.verify(jwt);
      expect(userUpdated.id).to.be.equal(UserJwt._id);
      expect(validate.data._id).to.exist;
      return expect(validate.data.email).to.exist;
    });
  })

  describe('#login(email, password)', function () {
    before(function* () {
      UserJwt = yield User.signup('Test User', 'testuser@mytest.com', '12345678', '123456789123', 'cr 5 # 12313 123 sur', '05001', '574', '57', 'local');
      return;
    });
    after(function (done) {
      UserModel.remove({
        email: 'testuser@mytest.com'
      }, done, done);
    });
    it('should return the jwt encoded of the user', function* () {
      let jwt = yield User.login('testuser@mytest.com', '12345678');
      let validate = JWT.verify(jwt);
      expect(validate.data._id).to.exist;
      return expect(validate.data.email).to.exist;
    });
    it('should return 403 status if the user is valid but password is not', function* () {
      try {
        let jwt = yield User.login('testuser@mytest.com', 'badpassword');
      } catch (e) {
        return expect(e.status).to.be.equal(403);
      }
      throw({error:'this login was success'});
    });
    it('should return 403 status if the user undefined', function* () {
      try {
        let jwt = yield User.login(undefined, 'badpassword');
      } catch (e) {
        return expect(e.status).to.be.equal(403);
      }
      throw({error:'this login was success'});
    });
    it('should return 403 status if the user and password is invalid', function* () {
      try {
        let jwt = yield User.login();
      } catch (e) {
        return expect(e.status).to.be.equal(403);
      }
      throw({error:'this login was success'});
    });
  });

  describe('#signup(name, email, password, mobile, address, city, department, country, providerId)', function () {
    beforeEach(function removeAll(done) {
      UserModel.remove({
        email: 'testuser@mytest.com'
      }, done, done);
    });

    afterEach(function removeAll(done) {
      UserModel.remove({
        email: 'testuser@mytest.com'
      }, done, done);
    });

    it('should register an user in database', function* () {
      let jwt = yield User.signup('Test User', 'testuser@mytest.com', '12345678', '123456789123', 'cr 5 # 12313 123 sur', '05001', '574', '57', 'local');
      let validate = JWT.verify(jwt);
      SavedUserToken = validate;
      expect(validate.data._id).to.exist;
      return expect(validate.data.email).to.exist;
    });

    it('should return 405 if the password is shorter than 8 characters', function* () {
      try {
        yield User.signup('Test User', 'testuser@mytest.com', '1234', '123456789123', 'cr 5 # 12313 123 sur', '05001', '574', '57', 'local');
      } catch (e) {
        return expect(e.status).to.be.equal(405);
      }
      throw({error:'this signup was success'});
    });

    it('should return 405 if email doesn\'t match with email format', function* () {
      try {
        yield User.signup('Test User', 'testuser.com', '1234', '123456789123', 'cr 5 # 12313 123 sur', '05001', '574', '57', 'local');
      } catch (e) {
        return expect(e.status).to.be.equal(405);
      }
      throw({error:'this signup was success'});
    });
  });
});
