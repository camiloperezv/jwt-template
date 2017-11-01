const UserModel = require('mongoose').model('User');
const JWT = require('../helpers/jwt.helper');
const ERROR403 = {
  error: 'unauthorized',
  status: 403
};

//registra un usuario, todos los parametros pasados son completamente OBLIGATORIOS
const signup = function* (name, email, password, mobile, address, city, department, country, providerId) {
  let user = new UserModel({
    name,
    email,
    password,
    mobile,
    address,
    city,
    department,
    country,
    providerId
  });
  if (password.length < 8) {
    throw ({
      error: 'unable to save this user',
      status: 405
    });
  }
  let savedUser;
  try {
    savedUser = yield user.save();
    if (!savedUser._id) {
      throw ({
        error: 'unable to save this user',
        status: 400
      });
    }
    let userToSign = {
      _id: savedUser._id.toString(),
      id: savedUser._id.toString(),
      email: savedUser.email,
    };
    let jwt = JWT.sign(userToSign);
    return jwt;
  } catch (e) {
    console.log('e is ',e)
    throw ({
      error: 'unable to save this user',
      status: 405
    });
  }
};

//verifica si un usuario existe en el sistema y retorna el jwt producido por el login
const login = function* (email, password) {
  try {
    let user = yield UserModel.findOne({
      email,
      active:true
    });
    if (!user) {
      throw (ERROR403);
    }
    if (!user.authenticate(password)) {
      throw (ERROR403);
    }
    let userToSign = {
      _id: user._id.toString(),
      id: user._id.toString(),
      email: user.email,
    };
    let jwt = JWT.sign(userToSign);
    return jwt;
  } catch (e) {
    throw (ERROR403);
  }
};

const update = function* (_id, name, mobile, address, city, department, country, password) {
  let updateUser = {};
  if (!_id) {
    throw ({
      error: 'user not found',
      status: 404
    });
  }
  if (name) {
    updateUser.name = name;
  }
  if (password) {
    updateUser.password = password;
  }
  if (mobile) {
    updateUser.mobile = mobile;
  }
  if (address) {
    updateUser.address = address;
  }
  if (city) {
    updateUser.city = city;
  }
  if (department) {
    updateUser.department = department;
  }
  if (country) {
    updateUser.country = country;
  }
  try {
    if (updateUser.password) {
      let user = yield UserModel.findById(_id);
      for (let i = 0; i < Object.keys(updateUser).length; i++) {
        user[Object.keys(updateUser)[i]] = updateUser[Object.keys(updateUser)[i]];
      }
      let savedUser = yield user.save();
      if (savedUser._id) {
        return {
          id: _id
        };
      }
    } else {
      let userSaved = yield UserModel.update({
        _id
      }, {
        $set: updateUser
      }, {
        runValidators: true
      });
      if (userSaved.nModified === 1) {
        return {
          id: _id
        };
      }
    }
  } catch (e) {
    throw ({
      error: 'unable to update the peusert',
      status: 405
    });
  }
  throw ({
    error: 'user not found not found',
    status: 404
  });
};
////////////////////
module.exports = {
  signup: signup,
  login: login,
  update: update
};
