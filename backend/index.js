if (process.env.NODE_ENV==='development'){ //validad si es desarrollo 
    require ('dotenv').config();//utilizar el archivo env de configuracion
}

const express=require('express');
const morgan =require('morgan');
const multer=require('multer');
const path=require('path');
const cors=require('cors');

//Initializations
const app=express(); //server exprress
require('./database');
//settings
app.set('port',process.env.PORT ||3000);

//middlewares
app.use(morgan('dev')); //morgan para visualizar detalles del servidor
//multer(subir imagenes)
const storage=multer.diskStorage({
    destination: path.join(__dirname,'public/upload'),
    filename(req,file,cb){
        cb(null,new Date().getTime()+path.extname(file.originalname))
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended:false})); //interpretar datos json del formulario
app.use(express.json()); //interpretar peticiones ajax enviados del servidor
app.use(cors()); //permite la comunicacoines servidores


//routes
app.use('/api/books',require('./routes/books'));
//static files
app.use(express.static(path.join(__dirname,'public')));

//start the server
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'));
})








