const express = require('express'); //se importa la dependencia de express
const mongoose = require('mongoose'); // se importa la dependencia de mongoose
const personsRoutes = require('./routes/users') // se inyecta el router de personas
/* se importa la dependencia dotenv y se ejecuta con el .config() 
para accessar a variables de ambiente que hayamos creado*/
require('dotenv').config(); // Se inyecta la variable de ambiente para MONGODB_URI

mongoose.Promise = global.Promise; // se establece el valor de mongoose.Promise
const app = express(); // se ejecuta express
/*se le pasa una variable de ambiente de node.js. Si se despliega la aplicacion en un servicio de hosting
permite tomar el puerto que da el servicio, y en caso de no estar disponible toma el que se le dio previamente*/ 
const port = process.env.PORT || 3000; // puerto por el que se va a escuchar. 

app.set ('view engine', 'ejs'); //Se establece el valor para el motor de vistas
app.set('views', './src/views') // ruta de renderización de vistas
/* Aplicación express especifica el directorio virtual '/assets'  ----> contenido estatico 
mapeado a ----> carpeta fisica '/public' */
app.use('/assets', express.static(__dirname + '/../public'));
app.use(express.urlencoded({extended:false}))

//routes --------------------------------------------

//Ruta personas
app.use(personsRoutes);

//mongdb connection --------------------------------

//Conexion a la base de datos
mongoose.connect(process.env.MONGODB_URI).then(()=> console.log("Conectado a la bd sample_mflix")).catch((error)=>console.error(error));

app.listen(port, () => console.log('server listening on port', port)) // Se levanta el servidor
