const express = require('express'); // se inyecta la dependencia de express
const router = express.Router(); // Se genera la instancia del router
const mongoose = require('mongoose') // se inyecta dependecia de mongoose
let User = require('../models/users'); // Se inyecta la dependencia del modelo ya creado

// Se agrega la primera ruta llamada usuarios con el metodo GET
//CATALOGO de los usuarios
router.get('/usuarios',async (req, res)=>{
    const Users = await User.find({}); 
    res.render('index.ejs',{Users}); //renderiza la vista index.ejs
});

//Endpoint para renderizar el formulario de -- AGREGAR -- alumnos
router.get('/addUser', function(req,res){
    res.render('addUser'); 
});

//Endpoint con metodo POST para -- AGREGAR --  un nuevo registro a la bd de MONGO DB Atlas
router.post('/addUser', function(req,res){
    const newUser = User ({ //permite crear un nuevo documento de la coleccion
        name: req.body.name, 
        email: req.body.email,
        password: req.body.password
    }); 

    newUser 
    .save() // retorna una promesa con dos caminos posibles 
    .then ((data)=>{res.redirect('/usuarios')}) // se ejecuta correctamnte: redirecciona al catalogo
    .catch((error)=> {res.json({message:error})}); // se ejecuta de manera incorrecta: arroja un mensaje de error
});

/* Endpoint con metodo GET que busca el documento y lo envia como parametro a una
ruta que renderiza el formulario para la -- EDICION -- del documento */
router.get('/findById/:id', (req, res)=>{ 
    User.findById(req.params.id) // metodo findById --> regresa promesa
    .then((myUser)=>{res.render('updateUser', {myUser})}) //Si es correcta renderiza a la vista para edicion con la informacion del documento a editar
    .catch((error)=>{res.json({message:error})}); // muestra mensaje de error en caso de que falle
}); 

/*Endpoint con metodo POST para la -- ACTUALIZACION -- del documento de la coleccion*/
router.post('/updateUser', (req, res)=>{
    User.findByIdAndUpdate(req.body.objId, //permite la actualizacion del documento
        {
            name: req.body.name, 
            email: req.body.email,
            password: req.body.password
        })
        .then((data)=>{res.redirect('/usuarios')}) // Si es correcto: renderiza al catalogo de usuarios
        .catch((error)=>{res.json({message:error})}); // Si no es correcto: arroja un mensaje de error
});

//Endpoint con metodo GET para la -- ELIMINACION -- del documento de la coleccion de MongoDB 
router.get('/deleteUser/:id',(req,res)=>{
    User.findByIdAndDelete(req.params.id) // recoje el id por URL. ---> Elimina documento de la coleccion
    .then((data)=>{res.redirect('/usuarios')}) // Ejecucion correcta: redirecciona a la pagina con el nuevo catalogo de usuarios
    .catch((error)=>{res.json({message:error})}); //  Ejecucion incorrecta: muestra un mensaje de error
});

//Endpoint con metodo POST para la -- BUSQUEDA -- del documento de la coleccion de MongoDB 
router.post('/find',(req,res)=>{
    User.find({name:{$regex: req.body.nombre, $options:"i"} } ) //realiza busqueda a partir de datos tomados desde el body
    .then((Users)=>{res.render('index', {Users})}) //Ejecucion correcta: Muestra los resultados de la busqueda
    .catch((error)=>{res.json({message:error})}); //Ejecucion incorrecta: Muestra mensaje de error
});

module.exports = router; //Se exporta el routeador