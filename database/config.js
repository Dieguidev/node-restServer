const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });

    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la BD ver logs');
  }

  // mongoose.set('useFindAndModify', false); // para que no nos de error al actualizar un registro en mongoDB
  // mongoose.set('useCreateIndex', true); // para que no nos de error al crear un indice en mongoDB
  // mongoose.set('useUnifiedTopology', true); // para que no nos de error al conectar a mongoDB en mongoDB
  // mongoose.set('useNewUrlParser', true); // para que no nos de error al conectar a mongoDB en mongoDB
  // mongoose.set('useFindAndModify', false); // para que no nos de error al actualizar un registro en mongoDB
};

module.exports = {
  dbConnection,
};
