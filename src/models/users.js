const mongoose  = require('mongoose'); //Se inyectan dependencias de mongoose

/* Cuando se crea la instancia se mandan dos parametros: el nombre de 
la coleccion contenida y el segundo es el nombre del esquema*/

let UserSchema = new mongoose.Schema({ //Se instancia un Schema de mongoose
    name: String,
    email: String,
    password:String
}); 

module.exports = mongoose.model('users', UserSchema); //Exportar una instancia de un modelo de mongoose
