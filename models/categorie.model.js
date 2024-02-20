const { Schema, model } = require('mongoose');

const CategorieSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

CategorieSchema.methods.toJSON = function () {
  const { __v, isActive, _id, ...category } = this.toObject();
  category.uid = _id;
  return category;
};

module.exports = model('Categorie', CategorieSchema);
