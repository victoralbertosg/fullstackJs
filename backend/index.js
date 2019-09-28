const express=require('express');
const morgan =require('morgan');
const multer=require('multer');
const path=require('path');

//Initializations
const app=express();
//settings
app.set('port',3000);

//start the server
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'));
})

//routes
app.use('/api/books',require('./routes/books'));
//static files
app.use(express.static(path.join(__dirname,'public')));

//middlewares
app.use(morgan('dev'));

//multer(subir imagenes)
const storage=multer.diskStorage({
    destination: path.join(__dirname,'public/upload'),
    filename(req,file,cb){
        cb(null,new Date().getTime()+path.extname(file.originalname))
    }
})
app.use(multer({storage}).single('image'));
//express para que se entiendaas los datos enviados del back y frontend
app.use(express.urlencoded({extended:false}));
app.use(express.json());