const { Schema, ObjectId, model } = require('mongoose');
const { validateUrl } = require('../utils/validators');

const cardSchema = new Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator: validateUrl,
      message: (props) => `${props.value} 'Некорректный адрес ссылки'`,
    },
  },
  owner: {
    required: true,
    type: ObjectId,
  },
  likes: {
    type: [ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);
