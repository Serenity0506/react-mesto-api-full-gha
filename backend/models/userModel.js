/* eslint-disable new-cap */
const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { validateUrl } = require('../utils/validators');
const { UnauthenticatedError } = require('../errors/http/UnauthenticatedError');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: validateUrl,
      message: (props) => `${props.value} 'Некорректный адрес ссылки'`,
    },
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = (email, password) => model('User').findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      return Promise.reject(new UnauthenticatedError('Неправильные почта или пароль'));
    }

    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthenticatedError('Неправильные почта или пароль'));
        }

        return user;
      });
  });

module.exports = model('User', userSchema);
